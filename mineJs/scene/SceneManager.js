import { GlobalScene } from "./GlobalScene.js";
import { AntarcticaScene } from "./AntarcticaScene.js";
import { ArcticScene } from "./ArcticScene.js"
import { LidarScene } from "./LidarScene.js"
import { TableFactory } from "../diagram/TableFactory.js";
import { Tools as tools } from "../basic/BasicTools.js";

export var SceneManager = () => {
    const TABLE_DEBUG = false;
    const __init__ = (props) => {
        props.factory = new TableFactory();
        // arcgis 3d map renderer
        if (!TABLE_DEBUG) {
            require([
                "esri/Map",
                "esri/views/SceneView",
                "esri/layers/GraphicsLayer",
                "esri/Graphic"
            ], (Map, SceneView, GraphicsLayer, Graphic) => {
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
                            date: Date.now(),
                            // directShadowsEnabled: false,
                            // ambientOcclusionEnabled: false,
                            // cameraTrackingEnabled: false
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
                    props.staticGLayer = new GraphicsLayer();
                    let ship_cache = [];
                    $.ajax(`${props.preDataUrl}/Common`).done((common) => {
                        let ships = common.data.ships;
                        for (let ship of ships) {
                            if (!isNaN(parseFloat(ship.lon)) && !isNaN(parseFloat(ship.lat))) {
                                ship_cache.push(new Graphic({
                                    geometry: {
                                        type: "point",
                                        x: parseFloat(ship.lon),
                                        y: parseFloat(ship.lat),
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
                                                href: "../../models/warShip.json"
                                            }
                                        }],
                                    }
                                }));
                            }
                        }
                    });
                    props.map.add(props.staticGLayer);
                    props.staticGLayer.addMany(ship_cache);

                    // init scenes
                    let scenes = [];
                    scenes.push(new GlobalScene(props)); // scene 1
                    scenes.push(new LidarScene(props)); // scene 2
                    scenes.push(new AntarcticaScene(props)); // scene 3
                    scenes.push(new ArcticScene(props)); // scene 4
                    scenes.forEach((scene) => {
                        props.vuePanel.menuEvents.set(scene.eventName, () => scene.load());
                    }); // load scene
                    scenes[0].load(); // load scene 1
                    props.vuePanel.init(); // vue panel init
                }, (e)=> {
                    tools.mutter(e, "error");
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