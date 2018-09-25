define(function () {
    'use strict';

    var innerUtils = {
        __defaultParam__(props, name, value) {
            if (typeof props === "object" && !props.hasOwnProperty(name)) {
                props[name] = value;
            }
        },
        __setProperties__(obj, properties) {
            if (obj && properties) {
                for (var name in properties) {
                    if (name in obj) {
                        obj[name] = properties[name];
                    }
                }
            }
        },
        __addProperty__(obj, key, val) {
            Object.defineProperty(obj, key, {
                configurable: false,
                writable: true,
                value: val
            });
        },
        __swap__(array, id1, id2) {
            let cache = array[id1];
            array[id1] = array[id2];
            array[id2] = cache;
        },
        __debug__: false
    };

    if (innerUtils.__debug__) {
        console.log("current project: debugger running!");
    }

    return innerUtils;
});