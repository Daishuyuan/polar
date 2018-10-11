import {
    TableFactory
} from "../diagram/TableFactory.js";
import {
    Tools as tools
} from "../basic/BasicTools.js";
import {
    DelayTime
} from "./VueLayer.js";
import {
    TABLEVIEW_ID,
    ARCGIS_SCENE
} from "./MainActivity.js";

export class SceneLayer {
    constructor(props) {
        const TABLE_DEBUG = false;
        this.vuePanel = props.vuePanel;
        this.tableViewId = props.tableViewId;
        this.menuId = props.menuId;
        var factory = new TableFactory();
        // request resource from url
        this.req = (url) => {
            return $.ajax({
                url: url,
                type: "GET",
                dataType: "json"
            });
        }
        // init tables in panel
        this.initTables = (url) => {
            this.req(url).then(function (scene) {
                for (let name in scene.tableLayer) {
                    factory.generate(TABLEVIEW_ID, scene.tableLayer[name]);
                }
            });
        }
        // all theme common init function
        this.themeInit = (props) => {
            // clear before status
            $(this.tableViewId).empty();
            if (props.name) {
                this.vuePanel.application.title = props.name;
                tools.mutter(`current scene:${props.name}-${props.wkid}`, "info");
            }
            // common process
            let delay = new DelayTime(0, 0.1);
            $(this.menuId).children().removeClass("hover").hide().show();
            this.vuePanel.application.mbuttons = props.menu.map((x) => {
                return {
                    name: x.name,
                    delay: delay.next(),
                    event: x.event
                }
            });
        }

        // arcgis 3d map renderer
        if (!TABLE_DEBUG) {
            require([
                "esri/Map",
                "esri/views/SceneView"
            ], (Map, SceneView) => {
                this.map = new Map({
                    basemap: "satellite",
                    ground: "world-elevation"
                });
    
                this.view = new SceneView({
                    alphaCompositingEnabled: true,
                    container: ARCGIS_SCENE,
                    map: this.map,
                    scale: 5000000000,
                    center: [-101.17, 21.78],
                    camera: {
                        position: [
                            -122, // lon
                            38, // lat
                            53000000 // elevation in meters
                        ],
                        heading: 95
                    },
                    environment: {
                        background: {
                            type: "color",
                            color: [0, 0, 0, 0]
                        },
                        starsEnabled: false,
                        atmosphereEnabled: false
                    }
                });
            });
        }

        // registery event
        this.vuePanel.menuEvents.set("eventGlobalScene", () => {
            this.loadGlobalScene();
        });
        this.vuePanel.menuEvents.set("eventAntarcticScene", () => {
            this.loadAntarcticaScene();
        });
        this.vuePanel.menuEvents.set("eventArcticScene", () => {
            this.loadArcticScene();
        });
        this.vuePanel.menuEvents.set("eventLidarScene", () => {
            this.loadLidarScene();
        });
    }

    preloaded() {
        return $.when();
    }

    init() {
        this.vuePanel.init();
    }

    // 加载全球场景布局
    loadGlobalScene() {
        this.themeInit({
            name: "全球尺度场景",
            wkid: "globalScene",
            menu: [{
                name: "全球尺度场景",
                event: "eventGlobalScene"
            }, {
                name: "南极区域场景",
                event: "eventAntarcticScene"
            }, {
                name: "北极区域场景",
                event: "eventArcticScene"
            }]
        });
    }

    // 加载南极场景布局
    loadAntarcticaScene() {
        this.themeInit({
            name: "南极区域场景",
            wkid: "antarcticScene",
            menu: [{
                name: "返回",
                event: "eventGlobalScene"
            }, {
                name: "激光雷达",
                event: "eventLidarScene"
            }, {
                name: "冰下湖钻探",
                event: "eventIceLakeDrillingScene"
            }, {
                name: "高空物理",
                event: "eventHighAltitudePhysicsScene"
            }]
        });
        this.initTables("http://localhost:3000/Antarctica");
    }

    // 加载北极场景布局
    loadArcticScene() {
        this.themeInit({
            name: "北极区域场景",
            wkid: "arcticScene",
            menu: [{
                name: "返回",
                event: "eventGlobalScene"
            }]
        });
    }

    // 加载激光雷达场景布局
    loadLidarScene() {
        this.themeInit({
            name: "激光雷达场景",
            wkid: "lidarScene",
            menu: [{
                name: "返回",
                event: "eventAntarcticScene"
            }]
        });
        this.initTables("http://localhost:3000/Lidar");
    }
}