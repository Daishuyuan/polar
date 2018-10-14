/**
 * @name MainActivity 全局配置与应用入口
 * @author dsy 2018-09-10
 * @requires ThreeComponents
 * @requires VueComponents
 * @requires BasicTools
 */
import { VueLayer } from "./VueLayer.js";
import { SceneManager } from "../scene/SceneManager.js";
import { Tools as tools } from "../basic/BasicTools.js";

export var MAIN_APP_ID = "#MainApp";
export var TABLEVIEW_ID = "#tableView";
export var MENU_ID = "#menu";
export var MASK_HTML_PATH = "/polar/cutscene.html";
export var ARCGIS_SCENE = "threeJsView";
export var PRE_DATA_URL = "http://localhost:3000";

! function () {
    tools.honour();
    try {
        let vueLayer = new VueLayer(MASK_HTML_PATH, MAIN_APP_ID);
        let manager = SceneManager();
        manager.init({
            vuePanel: vueLayer,
            tableViewId: TABLEVIEW_ID,
            menuId: MENU_ID,
            preDataUrl: PRE_DATA_URL,
            container: ARCGIS_SCENE
        });
    } catch (e) {
        tools.mutter(`outermost error msg: ${e}`, "fatal");
    }
}()