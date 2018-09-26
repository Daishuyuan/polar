/**
 * name: Polar Visualization System Station
 * time: 2018/7/11
 * author: dsy
 * version: 1.0.0
 */

 // require configuration
require.config({
    paths: {
        d3: "/polar/js/other/d3.min",
        domReady: "/polar/js/other/require-domReady.min",
        Echarts: "/polar/js/echarts/echarts.min",
        Vue: "/polar/js/other/vue.min",
        JQuery: "/polar/js/other/jquery-3.3.1.min",
        THREE: "/polar/js/threeJs/three.min",
        BasicTools: "/polar/mineJs/basic/BasicTools",
        DataReceiver: "/polar/mineJs/basic/DataReceiver",
        BlockPipeline: "/polar/mineJs/pipeline/BlockPipeline",
        Controller: "/polar/mineJs/pipeline/Controller",
        Utils: "/polar/mineJs/pipeline/Utils",
        Gaffer: "/polar/mineJs/pipeline/Gaffer",
        Producer: "/polar/mineJs/pipeline/Producer",
        ShaderFactory: "/polar/mineJs/pipeline/ShaderFactory",
        Constants: "/polar/mineJs/pipeline/Constants",
        TableFactory: "/polar/mineJs/diagram/TableFactory",
        TestSet: "/polar/mineJs/test/TestSet",
        TableConfig: "/polar/mineJs/diagram/TableConfig"
    },
    shim: {
        "/polar/js/echarts/echarts-liquidfill.min.js": {
            deps: ["Echarts"]
        },
        "/polar/js/threeJs/extras/utils/GeometryUtils.js": {
            deps: ["THREE"],
            exports: "GeometryUtils"
        },
        "/polar/js/layer/layer.js": {
            deps: ["JQuery"],
            exports: "Layer"
        },
        "/polar/js/threeJs/extras/libs/system.min.js": {
            exports: "System"
        },
        "/polar/js/threeJs/extras/controls/OrbitControls.js": {
            deps: ["THREE"],
            exports: "THREE.OrbitControls"
        },
        "/polar/js/threeJs/extras/controls/FirstPersonControls.js": {
            deps: ["THREE"],
            exports: "THREE.FirstPersonControls"
        },
        "/polar/js/threeJs/extras/loaders/FBXLoader.js": {
            deps: ["THREE"],
            exports: "THREE.FBXLoader"
        },
        "/polar/js/threeJs/extras/loaders/GLTFLoader.js": {
            deps: ["THREE"],
            exports: "THREE.GLTFLoader"
        },
        "/polar/js/threeJs/Detector.js": {
            exports: "Detector"
        },
        "/polar/js/threeJs/extras/libs/stats.min.js": {
            exports: "Stats"
        }
    }
});

// Assembly Components
~function() {
    require([
        "ThreeComponents",
        "VueComponents",
        "BasicTools"
    ], function(tc, vc, tools) {
        try {
            tools.honour();
            if (!tools.envirNotPermit()) {
                tc.requestRes().then(function() {
                    tc.init();
                    vc.MainApp.loaded = true;
                });
            }
        } catch(e) {
            tools.mutter(`outermost error msg: ${e}`, "fatal");
        }
    });
}()