import { Tools as tools } from "../basic/BasicTools.js";
import { DelayTime } from "../core/VueLayer.js";

var SCENE_NAMES = new Map();
var INNER_DOMS = new Map();

export class Scene {
    constructor(props) {
        if (!props.wkid || !props.eventName) {
            tools.mutter("wkid and eventName both can't be null or undefined.", "error");
        }
        this._vuePanel = props.vuePanel;
        this._tableViewId = props.tableViewId;
        this._menuId = props.menuId;
        this._staticGLayer = props.staticGLayer;
        this._map = props.map;
        this._view = props.view;
        this._factory = props.factory;
        this._wkid = props.wkid;
        this._eventName = props.eventName;
        this._preDataUrl = props.preDataUrl;
        SCENE_NAMES.set(this._wkid, this._eventName); // register wkid and eventName
    }

    // this must be override in sub class
    get eventName() {
        return this._eventName;
    }

    // get eventName by name of sub class
    static get names() {
        return SCENE_NAMES;
    }

    // do the work of themes initialization
    themeInit(props) {
        // clear before status
        $(this._tableViewId).children().hide();
        if (props.name) {
            this._vuePanel.application.title = props.name;
            tools.watch("curScene", `current scene:${props.name}-${this._wkid}-${this._eventName}`);
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
        // init tables
        if (INNER_DOMS.has(this._wkid)) {
            INNER_DOMS.get(this._wkid).forEach((dom) => $(dom).show());
        } else {
            try {
                let dom_cache = [];
                tools.req(`${this._preDataUrl}\\${this._wkid}`).then((scene) => {
                    if (scene.tableLayer) {
                        for (let name in scene.tableLayer) {
                            let dom = this._factory.generate(this._tableViewId, scene.tableLayer[name]);
                            dom_cache.push(dom);
                        }
                    } else {
                        tools.mutter("tableLayer isn't exist.", "error");
                    }
                });
                INNER_DOMS.set(this._wkid, dom_cache);
            } catch (e) {
                tools.mutter(e, "error");
            }
        }
    }
}