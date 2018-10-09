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

        var pipeline = new BlockPipeline(backgroundViewId),
            switchAnimation = null;

        function initScene(url) {
            $.ajax({
                url: url, // 'http://localhost:3000/Antarctica'
                type: "GET",
                dataType: "json",
                success: function (scene) {
                    for (let name in scene.tableLayer) {
                        TableFactory.generate("#tableView", scene.tableLayer[name]);
                    }
                }
            });
        }

        function requestRes() {
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
        }

        function GlobalFullSituation(world) {
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

            // add labels in earth
            earth.addLabelToEarth({
                height: 15,
                width: 15,
                lon: 76.96,
                lat: -67.21,
                path: './img/ui/ship.png',
                attr: {
                    name: "白濑"
                }
            });
            earth.addLabelToEarth({
                height: 15,
                width: 15,
                lon: 85.76,
                lat: -60.50,
                path: './img/ui/ship.png',
                attr: {
                    name: "海洋六号"
                }
            });
            earth.addLabelToEarth({
                height: 15,
                width: 15,
                lon: 61.14,
                lat: -62.96,
                path: './img/ui/ship.png',
                attr: {
                    name: "向阳红10号"
                }
            });
            earth.addLabelToEarth({
                height: 15,
                width: 15,
                lon: -56.58,
                lat: -62.24,
                path: './img/ui/ship.png',
                attr: {
                    name: "雪龙号"
                }
            });
            // Great Wall Station
            earth.addLabelToEarth({
                height: 15,
                width: 15,
                lon: -58.5772,
                lat: -62.1305,
                path: './img/ui/location.png',
                attr: {
                    name: "长城站"
                }
            });
            // Kunlun Station
            earth.addLabelToEarth({
                height: 15,
                width: 15,
                lon: 77.0659,
                lat: -80.2502,
                path: './img/ui/location.png',
                attr: {
                    name: "昆仑站"
                }
            });
            // Taishan Station           
            earth.addLabelToEarth({
                height: 15,
                width: 15,
                lon: 76.5829,
                lat: -73.5150,
                path: './img/ui/location.png',
                attr: {
                    name: "泰山站"
                }
            });
            // Zhongshan Station
            earth.addLabelToEarth({
                height: 15,
                width: 15,
                lon: 76.2218,
                lat: -69.2225,
                path: './img/ui/location.png',
                attr: {
                    name: "中山站"
                }
            });

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
                if(list.length > 0) {
                    rotateSceneFlag = false;
                    for(let i=0; i<list.length; ++i) {
                        let obj = list[i].object,
                            vec2 = list[i].point.project(defaultCam),
                            vec = world.camXY2ScreenXY(vec2);
                        if (!tips.visiable) {
                            tips.visiable = true;
                            tips.left = `${parseInt(vec.x - parseInt(tips.width)/2)}px`;
                            tips.top = `${parseInt(vec.y - parseInt(tips.height)/2)}px`;
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

            // theme common init
            function themeInit(name, wkid, menu) {
                // clear before status
                world.animateClear(switchAnimation);
                $("#tableView").empty();
                vuePanel.MainApp.title = name;
                // common process
                tools.mutter(`current scene:${name}-${wkid}`, "info");
                let delay = vuePanel.DelayTime(0, 0.1);
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
                    controller.addOrbitController(defaultCam);
                    world.animate(switchAnimation = controller.createPullPushAnimation(defaultCam, {
                        toX: 0,
                        toY: 0,
                        toZ: 2010
                    }));
                },
                polarSituation: function (id = 1) {
                    themeInit("南极区域场景", "polarSituation", [{
                        name: "返回",
                        event: "eventGlobalSituation"  
                    },{
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
                    initScene("http://localhost:3000/Antarctica");
                    world.animate(switchAnimation = controller.createPullPushAnimation(defaultCam, {
                        toX: 0,
                        toY: -1300,
                        toZ: 0,
                        lookAt: southPole
                    }));
                },
                arcticSituation: function(id = 2) {
                    themeInit("北极区域场景", "arcticSituation", [{
                        name: "返回",
                        event: "eventGlobalSituation"  
                    }]);
                    world.animate(switchAnimation = controller.createPullPushAnimation(defaultCam, {
                        toX: 0,
                        toY: 1300,
                        toZ: 0,
                        lookAt: northPole
                    }));
                },
                lidarSituation: function(id = 3) {
                    themeInit("激光雷达场景", "lidarSituation", [{
                        name: "返回",
                        event: "eventAntarcticSituation"  
                    }]);
                    initScene("http://localhost:3000/Lidar");
                }
            }
        }

        function init() {
            // set theme function
            function setThemeFunc(panel, name, func) {
                panel.menuEvents.set(name, function() {
                    func && func();
                });
            }

            // create new world
            pipeline.newWorld("origin").then(function (world) {
                // init params
                let worldManager = new GlobalFullSituation(world);
                // first situation
                worldManager.globalSituation();
                // set menu function
                setThemeFunc(vuePanel, "eventGlobalSituation", worldManager.globalSituation);
                setThemeFunc(vuePanel, "eventAntarcticSituation", worldManager.polarSituation);
                setThemeFunc(vuePanel, "eventArcticSituation", worldManager.arcticSituation);
                setThemeFunc(vuePanel, "eventLadar", worldManager.lidarSituation);
                // setThemeFunc(vuePanel, "eventLadar", );
                // vuePanel.menuEvents.set("eventLadar", function() {});
                // vuePanel.menuEvents.set("eventIceLakeDrilling", function() {});
                // vuePanel.menuEvents.set("eventHighAltitudePhysics", function() {});
            });
            // show this world
            pipeline.waken("origin");
        }

        return {
            requestRes: requestRes,
            init: init
        };
    });