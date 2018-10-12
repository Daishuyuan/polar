import { Scene } from "./Scene.js"
import { GlobalScene } from "./GlobalScene.js"
import { LidarScene } from "./LidarScene.js";

export class AntarcticaScene extends Scene {
    constructor(props) {
        props.eventName = "eventAntarcticScene";
        super(props);
        require(["esri/Camera", "esri/geometry/Point"], (Camera, Point) => {
            this.ANTARCTICA_VIEW_POINT = new Camera({
                position: new Point({
                    x: 54.58, // lon
                    y: -82.6, // lat
                    z: 18000000, // elevation in meters
                }),
                heading: 95, // facing due south
            });
        });
    }

    load() {
        super.themeInit({
            name: "南极区域场景",
            wkid: "antarcticScene",
            menu: [{
                name: "返回",
                event: GlobalScene.EVENT_NAME
            }, {
                name: "激光雷达",
                event: LidarScene.EVENT_NAME
            }, {
                name: "冰下湖钻探",
                event: "eventIceLakeDrillingScene"
            }, {
                name: "高空物理",
                event: "eventHighAltitudePhysicsScene"
            }],
            viewField: this.ANTARCTICA_VIEW_POINT
        });
        super.initTables("Antarctica");
    }
}