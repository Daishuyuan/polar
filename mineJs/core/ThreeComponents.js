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
    "TableFactory",
    "BasicTools"
],
    function (BlockPipeline, vuePanel, TableFactory, tools) {
        const backgroundViewId = "threeJsView";
        const Producer = "Producer";
        const Gaffer = "Gaffer";
        const Controller = "Controller";

        var pipeline = new BlockPipeline(backgroundViewId);
        var system = (function () {
            var switchAnimation = null;

            function req(url) {
                return $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json"
                });
            }

            return {
                initScene: function (url) {
                    req(url).then(function (scene) {
                        for (let name in scene.tableLayer) {
                            TableFactory.generate("#tableView", scene.tableLayer[name]);
                        }
                    });
                },
                initShipsAndStations: function (earth, url) {
                    req(url).then(function (common) {
                        for (let i = 0, len = common.data.ships.length; i < len; ++i) {
                            let ship = common.data.ships[i];
                            earth.addLabelToEarth({
                                height: 15,
                                width: 15,
                                lon: ship.lon,
                                lat: ship.lat,
                                path: './img/ui/ship.png',
                                attr: {
                                    name: ship.name
                                }
                            });
                        }
                        for (let j = 0, len = common.data.stations.length; j < len; ++j) {
                            let station = common.data.stations[j];
                            earth.addLabelToEarth({
                                height: 15,
                                width: 15,
                                lon: station.lon,
                                lat: station.lat,
                                path: './img/ui/location.png',
                                attr: {
                                    name: station.name
                                }
                            });
                        }
                    })
                },
                initSceneManager: function (world) {
                    // foundation of this world
                    const MC = 0;
                    // const CHAOS_SIZE = 2100;
                    const EARTH_RAD = 400;
                    const EARTH_SEG = 64;

                    // request creater of this world
                    let producer = world.get(Producer),
                        gaffer = world.get(Gaffer),
                        controller = world.get(Controller),
                        mineCraft = new THREE.Group(),
                        southPole = new THREE.Vector3(0, 400, 0),
                        northPole = new THREE.Vector3(0, -400, 0),
                        defaultCam = null,
                        rotateSceneFlag = true;

                    // initialize camera
                    defaultCam = world.getCamera(MC, {
                        fov: 30,
                        near: 1,
                        far: 20000
                    });
                    // add light to environment
                    world.add(gaffer.getAmbientLight({
                        color: 0xffffff
                    }));
                    world.add(gaffer.getDirctionLight({
                        color: 0xffffff,
                        x: 500,
                        y: 600,
                        z: 400,
                        intensity: 0.15
                    }));
                    // build sphere of earth
                    let earth = producer.getEarth({
                        radius: EARTH_RAD,
                        widthSeg: EARTH_SEG,
                        heightSeg: EARTH_SEG,
                        surface: './img/earth/earth_nocloud.jpg',
                        bumpMap: './img/earth/earth_bump.jpg',
                        spec: './img/earth/earth_specular.jpg',
                        atmosphere: './img/earth/earth_clouds.png',
                        ring: './img/earth/globe-topglow.png'
                    });
                    // ships and stations initialization
                    system.initShipsAndStations(earth, "http://localhost:3000/Common");
                    // add satellite to synchronous track
                    earth.addObjToSyncOrbit({
                        lon: 90,
                        lat: 0,
                        item: producer.getItem({
                            path: './models/Calipso/scene.gltf',
                            scale: 0.01
                        })
                    });
                    // scene animation
                    world.on("beforeProc", function (event) {
                        rotateSceneFlag && mineCraft.rotateY(event * 0.01);
                    });
                    world.on("afterProc", function () {
                        let list = world.getIntersectObjects(earth.getLabels().children),
                            tips = vuePanel.MainApp.tips;
                        if (list.length > 0) {
                            rotateSceneFlag = false;
                            for (let i = 0; i < list.length; ++i) {
                                let obj = list[i].object,
                                    vec2 = list[i].point.project(defaultCam),
                                    vec = world.camXY2ScreenXY(vec2);
                                if (!tips.visiable) {
                                    tips.visiable = true;
                                    tips.left = `${parseInt(vec.x - parseInt(tips.width) / 2)}px`;
                                    tips.top = `${parseInt(vec.y - parseInt(tips.height) / 2)}px`;
                                    tips.text = obj.attr.name;
                                }
                            }
                        } else {
                            tips.visiable = false;
                            rotateSceneFlag = true;
                        }
                    });

                    // composition of each object
                    mineCraft.add(earth);
                    world.add(mineCraft);
                    world.addController(controller.addOrbitController(defaultCam));

                    // theme common init
                    function themeInit(name, wkid, menu) {
                        // clear before status
                        world.enableControllers(false);
                        world.animateClear(switchAnimation);
                        $("#tableView").empty();
                        vuePanel.MainApp.title = name;
                        // common process
                        tools.mutter(`current scene:${name}-${wkid}`, "info");
                        let delay = vuePanel.DelayTime(0, 0.1);
                        $("#menu").children().removeClass("hover").hide().show();
                        vuePanel.MainApp.mbuttons = menu.map((x) => {
                            return {
                                name: x.name,
                                delay: delay.next().value,
                                event: x.event
                            }
                        });
                    }

                    return {
                        // global scene initialization
                        globalSituation: function (id = 0) {
                            themeInit("全球尺度场景", "globalSituation", [{
                                name: "全球尺度场景",
                                event: "eventGlobalSituation"
                            }, {
                                name: "南极区域场景",
                                event: "eventAntarcticSituation"
                            }, {
                                name: "北极区域场景",
                                event: "eventArcticSituation"
                            }]);
                            world.animate(switchAnimation = controller.createPullPushAnimation(defaultCam, {
                                toX: 0,
                                toY: 0,
                                toZ: 2010,
                                callback: function() {
                                    world.enableControllers(true);
                                }
                            }));
                        },
                        polarSituation: function (id = 1) {
                            themeInit("南极区域场景", "polarSituation", [{
                                name: "返回",
                                event: "eventGlobalSituation"
                            }, {
                                name: "激光雷达",
                                event: "eventLadar"
                            }, {
                                name: "冰下湖钻探",
                                event: "eventIceLakeDrilling"
                            }, {
                                name: "高空物理",
                                event: "eventHighAltitudePhysics"
                            }]);
                            //加载南极区域场景json数据 demon 2018年9月28日
                            system.initScene("http://localhost:3000/Antarctica");
                            world.animate(switchAnimation = controller.createPullPushAnimation(defaultCam, {
                                toX: 0,
                                toY: -1300,
                                toZ: 0,
                                lookAt: southPole,
                                callback: function() {
                                    world.enableControllers(true);
                                }
                            }));
                        },
                        arcticSituation: function (id = 2) {
                            themeInit("北极区域场景", "arcticSituation", [{
                                name: "返回",
                                event: "eventGlobalSituation"
                            }]);
                            world.animate(switchAnimation = controller.createPullPushAnimation(defaultCam, {
                                toX: 0,
                                toY: 1300,
                                toZ: 0,
                                lookAt: northPole,
                                callback: function() {
                                    world.enableControllers(true);
                                }
                            }));
                        },
                        lidarSituation: function (id = 3) {
                            themeInit("激光雷达场景", "lidarSituation", [{
                                name: "返回",
                                event: "eventAntarcticSituation"
                            }]);
                            system.initScene("http://localhost:3000/Lidar");
                        }
                    }
                }
            }
        })();

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