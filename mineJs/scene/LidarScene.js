import { Scene } from "./Scene.js"

export class LidarScene extends Scene {
    constructor(props) {
        super(props);
    }

    load() {
        super.themeInit({
            name: "激光雷达场景",
            wkid: "lidarScene",
            menu: [{
                name: "返回",
                event: "eventAntarcticScene"
            }]
        });
        super.initTables("Lidar");
    }
}