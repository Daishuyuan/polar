import { Scene } from "./Scene.js"

export class GlobalScene extends Scene {
    constructor(props) {
        super(props);
        require(["esri/Camera", "esri/geometry/Point"], (Camera, Point) => {
            this.GLOBAL_VIEW_POINT = new Camera({
                position: new Point({
                    x: 121.23, // lon
                    y: 30.8, // lat
                    z: 530000000 // elevation in meters
                }),
                heading: 95, // facing due south
                tilt: 45 // bird's eye view
            });
        });
    }

    load() {
        super.themeInit({
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
            }],
            viewField: this.GLOBAL_VIEW_POINT
        });
    }
}