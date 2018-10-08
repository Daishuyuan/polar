/**
 * @name Utils 配置工具
 * @author dsy 2018-09-22
 * @description 渲染器内部配置工具
 * - __defaultParam__ 为对象设置默认参数
 * - __setProperties__ 设置属性参数
 * - __addProperty__ 添加属性参数
 * - __swap__ 交换数组中两个元素的值
 * - __debug__ 是否开启debug info
 * - __tableDebug__是否渲染三维场景
 * @exports *Utils
 */
define(function () {
    'use strict';

    return {
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
        get __debug__() { return false; }, // true -> open 3d debug info
        get __tableDebug__() { return false; } // true -> close 3d renderer
    };
});