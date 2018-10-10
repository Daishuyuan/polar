// build background of chaos
// let chaos = producer.getChaos({
//     right: './img/skybox/px.jpg',
//     left: './img/skybox/nx.jpg',
//     top: './img/skybox/py.jpg',
//     bottom: './img/skybox/ny.jpg',
//     back: './img/skybox/pz.jpg',
//     front: './img/skybox/nz.jpg',
//     size: CHAOS_SIZE
// });
// mineCraft.add(chaos);

define([
        "BlockPipeline",
        "VueComponents",
        "Scenes"
    ],
    function (BlockPipeline, vuePanel, system) {
        const backgroundViewId = "threeJsView";
        var pipeline = new BlockPipeline(backgroundViewId);

        return {
            requestRes: function () {
                return pipeline.preLoad([
                    './img/terrain/terrainBack.jpg',
                    './img/terrain/terrainSide.jpg',
                    // '/models/SatelliteBig/scene.gltf',
                    './models/Calipso/scene.gltf',
                    './img/earth/earth.jpg',
                    './img/earth/globe-topglow.png',
                    './img/earth/earth_nocloud.jpg',
                    './img/earth/earth_bump.jpg',
                    './img/earth/earth_specular.jpg',
                    './img/earth/earth_clouds.png',
                    './img/ui/location.png',
                    './img/ui/ship.png',
                    './img/skybox/nx.jpg',
                    './img/skybox/ny.jpg',
                    './img/skybox/nz.jpg',
                    './img/skybox/px.jpg',
                    './img/skybox/py.jpg',
                    './img/skybox/pz.jpg'
                ]);
            },
            init: function () {
                // set theme function
                function setThemeFunc(panel, name, func) {
                    panel.menuEvents.set(name, function () {
                        func && func();
                    });
                }
                // create new world
                pipeline.newWorld("origin").then(function (world) {
                    // init params
                    let worldManager = system.initSceneManager(world);
                    // first situation
                    worldManager.globalSituation();
                    // set menu function
                    setThemeFunc(vuePanel, "eventGlobalSituation", worldManager.globalSituation);
                    setThemeFunc(vuePanel, "eventAntarcticSituation", worldManager.polarSituation);
                    setThemeFunc(vuePanel, "eventArcticSituation", worldManager.arcticSituation);
                    setThemeFunc(vuePanel, "eventLadar", worldManager.lidarSituation);
                });
                // show this world
                pipeline.waken("origin");
            }
        };
    });