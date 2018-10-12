import { Tools as tools } from "../basic/BasicTools.js";
import { DelayTime } from "../core/VueLayer.js";

export class Scene {
    constructor(props) {
        this._vuePanel = props.vuePanel;
        this._tableViewId = props.tableViewId;
        this._menuId = props.menuId;
        this._staticGLayer = props.staticGLayer;
        this._map = props.map;
        this._view = props.view;
        this._factory = props.factory;
        this._eventName = props.eventName;
        this._preDataUrl = props.preDataUrl;
    }

    get EVENT_NAME() {
        return this._eventName;
    }

    initTables(name) {
        tools.req(`${this._preDataUrl}\${name}`).then((scene) => {
            for (let name in scene.tableLayer) {
                this._factory.generate(this._tableViewId, scene.tableLayer[name]);
            }
        });
    }

    themeInit(props) {
        // clear before status
        $(this._tableViewId).empty();
        if (props.name) {
            this._vuePanel.application.title = props.name;
            tools.watch("curScene", `current scene:${props.name}-${props.wkid}`);
        }
        // common process
        let delay = new DelayTime(0, 0.1);
        $(this._menuId).children().hide().show(); // reactivate animation in menu elements
        this._vuePanel.application.mbuttons = props.menu.map((x) => {
            return {
                name: x.name,
                delay: delay.next(),
                event: x.event
            }
        });
        // look at defined view field
        if (this._map && this._view && props.viewField) {
            this._view.goTo(props.viewField, {
                animate: true
            });
        }
    }
}