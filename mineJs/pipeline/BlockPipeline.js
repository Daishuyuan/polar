/**
 * @name BlockPipeline ThreeJs渲染引擎核心
 * @author dsy 2018-09-21
 * @description 渲染引擎核心，提供的主要外部函数如下：
 * - preLoad 预加载资源
 * - waken 开启渲染循环
 * - newWorld 创建一个世界，里面有全部需要调用的模块
 * @requires jQuery
 * @requires Constants
 * @requires Producer
 * @requires BasicTools
 * @requires Utils
 * @requires Gaffer
 * @requires Controller
 * @requires stats
 * @requires d3
 * @requires GLTFLoader
 * @requires FBXLoader
 * @exports BlockPipeline
 */
define([
    "Constants",
    "Producer",
    "BasicTools",
    "Utils",
    "Gaffer",
    "Controller",
    "/polar/js/threeJs/extras/libs/stats.min.js",
    "d3",
    "/polar/js/threeJs/extras/loaders/GLTFLoader.js",
    "/polar/js/threeJs/extras/loaders/FBXLoader.js",
    "domReady!"
], function (Constants, Producer, tools, Utils, Gaffer, Controller, Stats, d3) {
    'use strict';
    const GLASSPLATE_STYLE = "position: absolute;left:0%;top:0%;width:100%;height:100%;";
    const SVG_XMLNS_MARK = "http://www.w3.org/2000/svg";
    const SVG_VERSION = "1.1";

    function BlockPipeline(id) {
        // define inner params
        var _container = null,
            _renderer = null,
            _prop = {},
            _allEvents = {},
            _resources = {},
            _producer = null,
            _utils = null,
            _gaffer = null,
            _controller = null,
            _worlds = null,
            _cwName = null,
            _cts = Constants,
            _raycaster = new THREE.Raycaster(),
            _mouse = new THREE.Vector2(),
            _glassPlate = null;

        // initialize all params
        ~ function () {
            document.getElementById(id) ? tools.mutter(`valid dom id: ${id}`, "info") :
                tools.mutter(`inexistent dom id: ${id}`, "warn");
            while (!(_container = document.getElementById(id)));
            // init basic props
            __initBasicProps__(_prop);
            _cts.allContent().forEach(function (resName) {
                _resources[resName] = new Map();
            });
            // clearity of innerHTML
            _container.innerHTML && (_container.innerHTML = "");
            // configure the renderer
            _renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            _renderer.setClearColor(_prop.clearColor, 0);
            _renderer.setPixelRatio(window.devicePixelRatio);
            _renderer.setSize(_prop.cwidth, _prop.cheight);
            _renderer.shadowMap.enabled = true;
            _renderer.shadowMapSoft = true;
            _renderer.gammaInput = true;
            _renderer.gammaOutput = true;
            _container.appendChild(_renderer.domElement);
            _worlds = new Map();
            _producer = Producer(_renderer, _container, _resources);
            _utils = Utils;
            _gaffer = Gaffer();
            _controller = Controller(_container, _renderer);
            // reserve old event of keydown and add new one
            __createListenerEvent__(window, "onkeydown");
            __createListenerEvent__(window, "onkeyup");
            __createListenerEvent__(window, "onmouseup");
            __createListenerEvent__(window, "onmousedown");
            __createListenerEvent__(window, "onmousemove");
            __createListenerEvent__(window, "onmousewheel");
            __createListenerEvent__(window, "onresize");
            __createListenerEvent__(_container, "onmouseenter");
            __createListenerEvent__(_container, "onmouseout");
            for (var funcName in _prop.innerEvents) {
                __createListenerEvent__(_prop.innerEvents, funcName);
            }
            // init inner glassPlate
            _glassPlate = d3.select(_container)
                .append("div")
                .attr("style", GLASSPLATE_STYLE)
                .append("svg")
                .attr("xmlns", SVG_XMLNS_MARK)
                .attr("version", SVG_VERSION)
                .attr("width", "100%")
                .attr("height", "100%")
        }();

        // outter function
        if (!BlockPipeline.prototype.isFirstDefineMethodInClass) {
            Object.defineProperties(BlockPipeline.prototype, {
                isFirstDefineMethodInClass: {
                    configurable: false,
                    writable: false,
                    enumerable: false,
                    value: true
                },
                // preload resource before all process
                preLoad: {
                    configurable: false,
                    value: function (resource) {
                        if (resource && resource.length > 0) {
                            var reqs = [];
                            resource.forEach(function (path) {
                                var [loader, type] = __getLoaderAndType__(path),
                                    deferred = $.Deferred();
                                loader.load(path, function (res) {
                                    _resources[type].set(path, res);
                                    deferred.resolve(res);
                                }, function (xhr) {
                                    tools.mutter(type + " : " + (xhr.loaded / xhr.total * 100) + '% loaded', "info");
                                }, function (err) {
                                    tools.mutter(`running has error: ${err}`, "error");
                                });
                                reqs.push(deferred);
                            });
                            return $.when.apply(this, reqs);
                        } else {
                            throw new Error("resource list can't be void.");
                        }
                    }
                },
                // recall rendering cycle 
                waken: {
                    configurable: false,
                    value: function (name, props = {}) {
                        _utils.__defaultParam__(props, "once", false);
                        if (_worlds.has(name)) {
                            // prepare all the resource of the new world
                            var world = _worlds.get(name),
                                scene = world.get("Scene"),
                                camera = world.get("Cameras")[0],
                                restrainedName = world.get("Name"),
                                stats = world.has("curStats") ? world.get("curStats") : null;
                            // execute inilization process
                            _prop.innerEvents.initProc(_prop.clock.getDelta());
                            (function _v_innerCycle_v_() {
                                if (!Utils.__tableDebug__ && !props.once && restrainedName === _cwName) {
                                    // update the picking ray with the camera and mouse position
                                    _raycaster.setFromCamera(_mouse, camera);
                                    // execute process before rendering
                                    _prop.innerEvents.beforeProc(_prop.clock.getDelta());
                                    if (_renderer && scene && camera) {
                                        // rendering scene by the view of camera
                                        _renderer.render(scene, camera);
                                    } else {
                                        throw new Error("current scene or default camera is invalid.");
                                    }
                                    // update state of appication
                                    stats && stats.update();
                                    // execute process after rendering
                                    _prop.innerEvents.afterProc(_prop.clock.getDelta());
                                    // request next animation frame
                                    requestAnimationFrame(_v_innerCycle_v_);
                                } else {
                                    tools.mutter(`${restrainedName} is dismantled from render.`, "info");
                                }
                            })();
                        } else {
                            throw new Error(`This world: ${name} isn't exist.`);
                        }
                    }
                },
                // create world with all tools
                newWorld: {
                    configurable: false,
                    value: function (name = "default", behaviors) {
                        const MAX_ANIMATION_SIZE = 2000;
                        if (!_worlds.has(name)) {
                            var newWorld = new Map(),
                                defaultScene = new THREE.Scene(),
                                renderObjs = [];
                            // initialize new world
                            newWorld.set("Name", _cwName = name);
                            newWorld.set("Scene", defaultScene);
                            newWorld.set("Scenes", {
                                default: defaultScene
                            });
                            newWorld.set("InnerProp", _prop);
                            newWorld.set("Producer", _producer);
                            newWorld.set("Gaffer", _gaffer);
                            newWorld.set("Controller", _controller);
                            newWorld.set("Cameras", []);
                            newWorld.set("RenderObjs", renderObjs);
                            newWorld.set("Resources", _resources);
                            newWorld.set("Container", _container);
                            newWorld.set("Animation", new Map());
                            // build up inner functions
                            Object.assign(newWorld, {
                                // inner glassPlate
                                getGlassPlate: function () {
                                    return _glassPlate;
                                },
                                // camera xy to screen of web xy
                                camXY2ScreenXY: function (vec2) {
                                    return {
                                        x: (vec2.x + 1) * _prop.cwidth / 2,
                                        y: (-vec2.y + 1) * _prop.cheight / 2
                                    }
                                },
                                // add a object to this world
                                add: function (obj) {
                                    if (obj instanceof THREE.Object3D) {
                                        renderObjs.push(obj);
                                        defaultScene.add(obj);
                                    } else {
                                        throw new Error("obj is not type of Object3D");
                                    }
                                },
                                // execute a animation
                                animate: function (elem) {
                                    if (typeof elem === "function") {
                                        let animation = newWorld.get("Animation");
                                        if (!animation.has(defaultScene)) {
                                            animation.set(defaultScene, []);
                                        }
                                        let list = animation.get(defaultScene);
                                        list.push(elem);
                                    }
                                },
                                // clear a animation
                                animateClear: function (elem) {
                                    let list = newWorld.get("Animation").get(defaultScene);
                                    if (elem) {
                                        for (let i = 0, len = list.length; i < len; ++i) {
                                            if (list[i] === elem) {
                                                delete list[i];
                                                break;
                                            }
                                        }
                                    }
                                },
                                // replace a old animation to new animation
                                animateReplace: function (oldAnimate, newAnimate) {
                                    let list = newWorld.get("Animation").get(defaultScene);
                                    if (oldAnimate) {
                                        for (let i = 0, len = list.length; i < len; ++i) {
                                            if (list[i] === oldAnimate) {
                                                list[i] = newAnimate;
                                                break;
                                            }
                                        }
                                    } else {
                                        newWorld.animate(newAnimate);
                                    }
                                },
                                // turn to other scene
                                nextScene: function (name) {
                                    var scenes = newWorld.get("Scenes");
                                    if (!scenes[name]) {
                                        scenes[name] = new THREE.Scene();
                                    }
                                    newWorld.set("Scene", scenes[name]);
                                    return defaultScene = scenes[name];
                                },
                                // turn to other camera
                                getCamera: function (id, props) {
                                    return __addCamera__(newWorld, id, props);
                                },
                                // listen on event
                                on: function (type, method) {
                                    __addEvent__(newWorld, type, method);
                                },
                                // show basic setup
                                showBasicSet: function (props) {
                                    __showBasicSet__(newWorld, props);
                                },
                                // receive mouse select objects
                                getIntersectObjects: function (objList) {
                                    return _raycaster.intersectObjects(objList);
                                },
                                // receive mouse select an object
                                getIntersectObject: function (obj) {
                                    return _raycaster.intersectObject(obj);
                                }
                            });
                            // after proccess include recycle resource\update camera\delete unused animation
                            __addEvent__(newWorld, "afterProc", function (clock) {
                                let camera = newWorld.get("Cameras")[0],
                                    _animation = newWorld.get("Animation").get(defaultScene);
                                if (camera && camera.mineController && camera.mineController.update) {
                                    camera.mineController.update(clock);
                                }
                                if (_animation && _animation.length > 0) {
                                    if (_animation.length >= MAX_ANIMATION_SIZE) {
                                        _animation = _animation.filter(event => event != undefined);
                                    }
                                    for (let i = 0, len = _animation.length; i < len; ++i) {
                                        if (_animation[i] && !_animation[i](clock, newWorld)) {
                                            delete _animation[i];
                                        }
                                    }
                                }
                            });
                            // when resize window recalculate scenes
                            __addEvent__(newWorld, "onresize", function () {
                                let camera = newWorld.get("Cameras")[0];
                                camera.aspect = window.innerWidth / window.innerHeight;
                                camera.updateProjectionMatrix();
                                _renderer.setSize(window.innerWidth, window.innerHeight);
                            });
                            // when mouse move recording position
                            __addEvent__(newWorld, "onmousemove", function (event) {
                                _mouse.x = (event.clientX / _prop.cwidth) * 2 - 1;
                                _mouse.y = -(event.clientY / _prop.cheight) * 2 + 1;
                            });
                            _worlds.set(name, newWorld);
                            return {
                                then: function(callback) {
                                    callback(newWorld);
                                }
                            }
                        } else {
                            throw new Error(`This world: ${name} isn't created.`);
                        }
                    }
                }
            });
        }

        // inner function
        function __showBasicSet__(world, props = {}) {
            _utils.__defaultParam__(props, "size", 100);
            _utils.__defaultParam__(props, "divisions", 50);
            _utils.__defaultParam__(props, "axesLen", 20);
            var scene = world.get("Scene"),
                curStats = "curStats",
                curGrid = "curGrid",
                curAxis = "curAxis";
            _utils.__defaultParam__(props, "size", 50);
            _utils.__defaultParam__(props, "divisions", 20);
            _utils.__defaultParam__(props, "axesLen", 10);
            world.set(curStats, new Stats());
            world.set(curGrid, new THREE.GridHelper(props.size, props.divisions));
            world.set(curAxis, new THREE.AxesHelper(props.axesLen));
            _container.appendChild(world.get(curStats).dom);
            scene.add(world.get(curGrid));
            scene.add(world.get(curAxis));
        }

        // add camera
        function __addCamera__(world, id, props = {}) {
            var cameras = world.get("Cameras"),
                scene = world.get("Scene");
            if (!cameras[id]) {
                _utils.__defaultParam__(props, "x", 0);
                _utils.__defaultParam__(props, "y", 0);
                _utils.__defaultParam__(props, "z", 0);
                _utils.__defaultParam__(props, "fov", 20);
                _utils.__defaultParam__(props, "near", 0.1);
                _utils.__defaultParam__(props, "far", 500);
                _utils.__defaultParam__(props, "viewpos", scene.position);
                cameras[id] = new THREE.PerspectiveCamera(
                    props.fov,
                    _prop.cwidth / _prop.cheight,
                    props.near,
                    props.far
                );
                cameras[id].position.x = props.x;
                cameras[id].position.y = props.y;
                cameras[id].position.z = props.z;
                cameras[id].lookAt(props.viewpos);
                cameras[id].updateMatrixWorld();
            }
            _utils.__swap__(cameras, 0, id);
            return cameras[0];
        }

        // use threejs loader to load resource by path
        function __getLoaderAndType__(path) {
            let loader, type;
            switch (path.slice(path.lastIndexOf("."), path.length).toLowerCase()) {
                case ".jpg":
                case ".png":
                    loader = new THREE.TextureLoader();
                    type = _cts.RES_TYPE_TEXTURES;
                    break;
                case ".fbx":
                    loader = new THREE.FBXLoader();
                    type = _cts.RES_TYPE_MODELS;
                    break;
                case ".gltf":
                    loader = new THREE.GLTFLoader();
                    type = _cts.RES_TYPE_MODELS;
                    break;
                case ".fonts":
                    loader = new THREE.FontLoader();
                    type = _cts.RES_TYPE_FONTS;
                    break;
                default:
                    throw new Error(`unkown resource type => ${path}`);
            }
            return [loader, type];
        }

        // add basic event like click, dbclick, mouse and so on
        function __addEvent__(world, type, method) {
            if (typeof method == "function" && _allEvents[type]) {
                _allEvents[type].push({
                    wname: world.get("Name"),
                    method: method
                });
            } else {
                throw new Error(`${method} isn't a function or don't register.`);
            }
        }

        // create listener register
        function __createListenerEvent__(dom, eventName) {
            if (eventName in dom) {
                var oldEvent = dom[eventName],
                    handle = _allEvents[eventName] = [];
                dom[eventName] = function (event) {
                    oldEvent && oldEvent();
                    if (handle.length > 0) {
                        for (let i = 0; i < handle.length; ++i) {
                            if (handle[i].wname === _cwName) {
                                handle[i].method(event, _prop.params);
                            }
                        }
                    }
                }
            } else {
                throw new Error(`not exist this event: ${eventName}`);
            }
        }

        // init basic props for future usage
        function __initBasicProps__(__prop__) {
            Object.defineProperties(__prop__, {
                innerEvents: {
                    configurable: false,
                    writable: true,
                    value: {
                        initProc: null,
                        beforeProc: null,
                        afterProc: null
                    }
                },
                thisWorld: {
                    configurable: false,
                    writable: true,
                    value: function () {
                        return _worlds ? _worlds.get(_cwName) : null;
                    }
                },
                cwidth: {
                    value: $(_container).width(),
                    configurable: false,
                    writable: true
                },
                cheight: {
                    value: $(_container).height(),
                    configurable: false,
                    writable: true
                },
                clearColor: {
                    value: 0x0,
                    configurable: false,
                    writable: true
                },
                clock: {
                    value: new THREE.Clock(),
                    configurable: false
                }
            });
        }
    }

    return BlockPipeline;
});