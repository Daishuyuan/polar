/**
 * @name MainActivity 全局配置与应用入口
 * @author dsy 2018-09-10
 * @requires ThreeComponents
 * @requires VueComponents
 * @requires BasicTools
 */
import {VueLayer} from "./VueLayer.js";
import {SceneLayer} from "./SceneLayer.js";
import {Tools as tools} from "../basic/BasicTools.js";

!function() {
    tools.honour();
    try {
        const MAIN_APP_ID = "#MainApp";
        const TABLEVIEW_ID = "#tableView";
        const MENU_ID = "#menu";
        const MASK_HTML_PATH = "/polar/cutscene.html";
        let vueLayer = new VueLayer(MASK_HTML_PATH, MAIN_APP_ID);
        let sceneLayer = new SceneLayer({
            vuePanel: vueLayer,
            tableViewId: TABLEVIEW_ID,
            menuId: MENU_ID
        });
        sceneLayer.preloaded().then(function() {
            sceneLayer.init();
            sceneLayer.loadGlobalScene();
        });
    } catch(e) {
        tools.mutter(`outermost error msg: ${e}`, "fatal");
    }
}()