/**
 * @name Gaffer
 * @author 戴舒原
 * @description 灯光渲染
 */
define(["Utils"], function (Utils) {
    'use strict';
    var _utils = Utils;

    function Gaffer() {
        return {
            getAmbientLight: function (props = {}) {
                _utils.__defaultParam__(props, "color", 0xffffff);
                _utils.__defaultParam__(props, "intensity", 1);
                return new THREE.AmbientLight(props.color, props.intensity);
            },
            getHemisphereLight: function (props = {}) {
                _utils.__defaultParam__(props, "skyColor", 0xffffff);
                _utils.__defaultParam__(props, "groundColor", 0x0);
                _utils.__defaultParam__(props, "intensity", 1);
                return new THREE.HemisphereLight(props.skyColor, props.groundColor, props.intensity);
            },
            getDirctionLight: function (props = {}) {
                _utils.__defaultParam__(props, "x", 0);
                _utils.__defaultParam__(props, "y", 100);
                _utils.__defaultParam__(props, "z", 0);
                _utils.__defaultParam__(props, "color", 0xffffff);
                _utils.__defaultParam__(props, "castShadow", false);
                _utils.__defaultParam__(props, "intensity", 1);
                _utils.__defaultParam__(props, "help", false);
                var light = new THREE.DirectionalLight(props.color, props.intensity);
                light.position.set(props.x, props.y, props.z);
                light.castShadow = props.castShadow;
                if (props.castShadow) {
                    light.shadow.camera.top = 180;
                    light.shadow.camera.bottom = -100;
                    light.shadow.camera.left = -120;
                    light.shadow.camera.right = 120;
                }
                if (props.help) {
                    _utils.__defaultParam__(props, "size", 1);
                    var helper = new THREE.DirectionalLightHelper(light, props.size);
                    return helper;
                } else {
                    return light;
                }
            },
            getPointLight: function(props = {}) {
                _utils.__defaultParam__(props, "color", 0xffffff);
                _utils.__defaultParam__(props, "intensity", 1);
                _utils.__defaultParam__(props, "distance", 0);
                _utils.__defaultParam__(props, "decay", 1);
                _utils.__defaultParam__(props, "x", 0);
                _utils.__defaultParam__(props, "y", 0);
                _utils.__defaultParam__(props, "z", 0);
                var pointlight = new THREE.PointLight(props.color, props.intensity, props.distance, props.decay);
                pointlight.position.x = props.x;
                pointlight.position.y = props.y;
                pointlight.position.z = props.z;
                return pointlight;
            },
            getSpotLight: function (props = {}) {
                _utils.__defaultParam__(props, "color", 0xffffff);
                _utils.__defaultParam__(props, "penumbra", 0.7);
                _utils.__defaultParam__(props, "x", 0);
                _utils.__defaultParam__(props, "y", 0);
                _utils.__defaultParam__(props, "z", 0);
                var spotLight = new THREE.SpotLight(props.color);
                spotLight.penumbra = props.penumbra;
                spotLight.position.set(props.x, props.y, props.z);
                return spotLight;
            }
        };
    }

    return Gaffer;
});