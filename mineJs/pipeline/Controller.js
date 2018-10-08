/**
 * @name Controller 摄像机控制器
 * @author dsy 2018-09-23
 * @description 控制摄像机镜头的相关控制器
 * @requires Utils
 * @requires OrbitControls
 * @requires FirstPersonControls
 * @exports Controller
 */
define([
        "Utils",
        "/polar/js/threeJs/extras/controls/OrbitControls.js",
        "/polar/js/threeJs/extras/controls/FirstPersonControls.js"
    ],
    function (Utils) {
        'use strict';
        var _utils = Utils;

        function Controller(_container, _renderer) {
            return {
                createPullPushAnimation: function (camera, props = {}) {
                    _utils.__defaultParam__(props, "toX", camera.position.x);
                    _utils.__defaultParam__(props, "toY", camera.position.y);
                    _utils.__defaultParam__(props, "toZ", camera.position.z);
                    _utils.__defaultParam__(props, "lookAt", null);
                    _utils.__defaultParam__(props, "speed", 0.005);
                    _utils.__defaultParam__(props, "calback", null);
                    const EPSILON = 0.1, RATIO = 0.01;
                    let xMark = true,
                        yMark = true,
                        zMark = true;
                    return function (deltaTime, world) {
                        let deltaX = props.toX - camera.position.x,
                            deltaY = props.toY - camera.position.y,
                            deltaZ = props.toZ - camera.position.z,
                            step = props.speed;
                        Math.abs(deltaX) > EPSILON? camera.position.x += deltaX * step: xMark = false;
                        Math.abs(deltaY) > EPSILON? camera.position.y += deltaY * step: yMark = false;
                        Math.abs(deltaZ) > EPSILON? camera.position.z += deltaZ * step: zMark = false;
                        props.speed += deltaTime * RATIO;
                        camera.lookAt(props.lookAt ? props.lookAt : world.get("Scene").position);
                        return xMark || yMark || zMark || props.callback && props.callback() || false;
                    }
                },
                addPersonalController: function (camera, props = {}) {
                    if (camera) {
                        var controller = new THREE.FirstPersonControls(camera, _container);
                        _utils.__setProperties__(controller, props);
                        _utils.__addProperty__(camera, "mineController", controller);
                        return controller;
                    } else {
                        throw new Error(camera + " is invalid");
                    }
                },
                addOrbitController: function (camera, props = {}) {
                    if (camera) {
                        var controller = new THREE.OrbitControls(camera, _renderer.domElement);
                        _utils.__setProperties__(controller, props);
                        _utils.__addProperty__(camera, "mineController", controller);
                        return controller;
                    } else {
                        throw new Error(camera + " is invalid");
                    }
                }
            }
        }

        return Controller;
    });