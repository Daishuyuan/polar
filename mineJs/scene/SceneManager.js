import { GlobalScene } from "./GlobalScene.js";
import { AntarcticaScene } from "./AntarcticaScene.js";
import { ArcticScene } from "./ArcticScene.js"
import { LidarScene } from "./LidarScene.js"
import { TableFactory } from "../diagram/TableFactory.js";
import { Tools as tools } from "../basic/BasicTools.js";

export var SceneManager = () => {
    const TABLE_DEBUG = false;

    const __init_ship__= (layer, props) => {
        require([
            "esri/Graphic",
            "esri/geometry/Point"
        ], (Graphic, Point) => {
            $.ajax(`${props.preDataUrl}/Common`).done((common) => {
                let ships = common.data.ships, stations = common.data.stations;
                let ship_cache = [], lables_cache = [];
                ships.forEach((ship) => {
                    let lon = parseFloat(ship.lon), lat = parseFloat(ship.lat);
                    let tips = {};
                    if (!isNaN(lon) && !isNaN(lat)) {
                        ship_cache.push(new Graphic({
                            geometry: {
                                type: "point",
                                x: lon,
                                y: lat,
                                z: 0
                            },
                            symbol: {
                                type: "point-3d",
                                symbolLayers: [{
                                    type: "object",
                                    width: 30000,
                                    height: 30000,
                                    depth: 30000,
                                    resource: {
                                        href: "./models/Ship/warShip.json"
                                    }
                                }]
                            },
                            attributes: tips
                        }));
                        props.vuePanel.application.popups.push({
                            id: `${ship.name}_id`,
                            name: ship.name
                        });
                        tips.popup_id = setInterval(() => {
                            let screen_point = props.view.toScreen(new Point({
                                longitude: lon,
                                latitude: lat
                            }));
                            let dom = $(tools.identify(`${ship.name}_id`));
                            dom.css({
                                "left": `${screen_point.x + 28}px`,
                                "top": `${screen_point.y - dom.height()}px`
                            });
                        });
                    }
                });

                tools.watch("ships", ship_cache);
                tools.watch("fullLayer", layer);
                props.map.add(layer);
                layer.addMany(ship_cache.concat(lables_cache));
            });
        });
    }

    const __init_popup__ = (sceneView) => {
        sceneView.on("click", function(event) {
            event.stopPropagation(); // stop all propagation
            if (event && event.mapPoint) {
                console.log(event);
            }
        });
    }

    const __init__ = (props) => {
        props.factory = new TableFactory();
        // arcgis 3d map renderer
        if (!TABLE_DEBUG) {
            require([
                "esri/Map",
                "esri/views/SceneView",
                "esri/layers/GraphicsLayer"
            ], (Map, SceneView, GraphicsLayer,) => {
                props.map = new Map({
                    logo: false,
                    basemap: "satellite",
                    ground: "world-elevation"
                });
                tools.watch("map", props.map);
                props.view = new SceneView({
                    alphaCompositingEnabled: true,
                    container: props.container,
                    map: props.map,
                    environment: {
                        lighting: {
                            // date: Date.now(),
                            // directShadowsEnabled: false,
                            ambientOcclusionEnabled: true,
                            cameraTrackingEnabled: true
                        },
                        background: {
                            type: "color",
                            color: [0, 0, 0, 0]
                        },
                        starsEnabled: false,
                    }
                });
                tools.watch("view", props.view);
                props.view.ui.empty('top-left'); // remove control panel in top left
                props.view.ui._removeComponents(["attribution"]); // remove "Powered by esri"
                props.view.when(() => {
                    // add bounded elements
                    __init_ship__(props.staticGLayer = new GraphicsLayer(), props);
                    __init_popup__(props.view);

                    // init scenes
                    let scenes = [], dom = null;
                    scenes.push(new GlobalScene(props)); // scene 1
                    scenes.push(new LidarScene(props)); // scene 2
                    scenes.push(new AntarcticaScene(props)); // scene 3
                    scenes.push(new ArcticScene(props)); // scene 4
                    scenes.forEach((scene) => {
                        props.vuePanel.menuEvents.set(scene.eventName, () => {
                            scene.load();
                            if ((dom = $(tools.identify(props.recoverBtn)))) {
                                dom.click(() => scene.recoverSite());
                            }
                        });
                    }); // load scene
                    scenes[0].load(); // load scene 1
                    props.vuePanel.init(); // vue panel init
                }, (error)=> {
                    tools.mutter(error, "error");
                });
            });
        }
    }

    return {
        init: (props) => {
            props? __init__(props): tools.mutter("props unsettled.", "error");
        }
    }
};