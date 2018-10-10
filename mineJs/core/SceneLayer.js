import { TableFactory } from "../diagram/TableFactory.js";
import { Tools as tools } from "../basic/BasicTools.js";
import { DelayTime } from "./VueLayer.js";

export class SceneLayer {
    constructor(props) {
        this.vuePanel = props.vuePanel;
        this.tableViewId = props.tableViewId;
        this.menuId = props.menuId;
        // request resource from url
        this.req = (url) => {
            return $.ajax({
                url: url,
                type: "GET",
                dataType: "json"
            });
        }

        this.initTables = (url) => {
            req(url).then(function (scene) {
                for (let name in scene.tableLayer) {
                    TableFactory.generate("#tableView", scene.tableLayer[name]);
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
            wkid: "globalSituation",
            menu: [{
                name: "全球尺度场景",
                event: "eventGlobalSituation"
            }, {
                name: "南极区域场景",
                event: "eventAntarcticSituation"
            }, {
                name: "北极区域场景",
                event: "eventArcticSituation"
            }]
        });
    }

    // 加载南极场景布局
    loadAntarcticaScene() {
        this.themeInit({
            name: "南极区域场景",
            wkid: "polarSituation",
            menu: [{
                name: "返回",
                event: "eventGlobalSituation"
            }, {
                name: "激光雷达",
                event: "eventLadar"
            }, {
                name: "冰下湖钻探",
                event: "eventIceLakeDrilling"
            }, {
                name: "高空物理",
                event: "eventHighAltitudePhysics"
            }]
        });
        this.initTables("http://localhost:3000/Antarctica");
    }

    // 加载北极场景布局
    loadArcticScene() {
        this.themeInit({
            name: "北极区域场景",
            wkid: "arcticSituation",
            menu: [{
                name: "返回",
                event: "eventGlobalSituation"
            }]
        });
    }

    // 加载激光雷达场景布局
    loadLidarScene() {
        themeInit({
            name: "激光雷达场景",
            wkid: "lidarSituation",
            menu: [{
                name: "返回",
                event: "eventAntarcticSituation"
            }]
        });
        this.initTables("http://localhost:3000/Lidar");
    }
}