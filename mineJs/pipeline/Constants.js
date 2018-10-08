/**
 * @name Constants 渲染器内部配置常量
 * @author dsy 2018-09-22
 * @description 渲染器内部配置常量
 * - RES_TYPE_TEXTURES 标识纹理资源
 * - RES_TYPE_FONTS 标识字体资源
 * - RES_TYPE_MODELS 标识模型资源
 * - allContent 获取所有标识
 * - isElement 字符串是否是已知标识
 * @exports *Utils
 */
define(function() {
    'use strict';
    var constants = {};
    Object.defineProperties(constants, {
        RES_TYPE_TEXTURES: {
            configurable: false,
            enumerable: true,
            writable: false,
            value: "RES_TEXTURES_SHOU"
        },
        RES_TYPE_FONTS: {
            configurable: false,
            enumerable: true,
            writable: false,
            value: "RES_FONTS_SHOU"
        },
        RES_TYPE_MODELS: {
            configurable: false,
            enumerable: true,
            writable: false,
            value: "RES_MODELS_SHOU"
        },
        allContent: {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                var values = [];
                for (var name in constants) {
                    values.push(constants[name]);
                }
                return values;
            }
        },
        isElement: {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function(name) {
                return constants[name]? true: false;
            }
        }
    });

    return constants;
});