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

var MAIN_APP_ID = "#MainApp";
var TABLEVIEW_ID = "#tableView";
var MENU_ID = "#menu";
var MASK_HTML_PATH = "/polar/cutscene.html";
var ARCGIS_SCENE = "threeJsView";
var PRE_DATA_URL = "http://localhost:3000";

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