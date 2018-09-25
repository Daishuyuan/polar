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