import { PARAMS_TABLE as ptable } from "./ParamsTable.js";

export class BoxModel {
    constructor(func_x,func_y,func_w,func_h) {
        this.x = () => func_x();
        this.y = () => func_y();
        this.width = () => func_w();
        this.height = () => func_h();
    }

    hitTest(box) {
        let [x0, y0, w0, h0] = [this.x(), this.y(), this.width(), this.height()];
        let [x1, y1, w1, h1] = [box.x(), box.y(), box.width(), box.height()];
        if (x0 >= x1 && x0 <= x1 + w1 && y0 >= y1 && y0 <= y1 + h1) {
            return true;
        }
        if (x0 + w0 >= x1 && x0 + w0 <= x1 + w1 && y0 >= y1 && y0 <= y1 + h1) {
            return true;
        }
        if (x0 >= x1 && x0 <= x1 + w1 && y0 + h0 >= y1 && y0 + h0 <= y1 + h1) {
            return true;
        }
        if (x0 + w0 >= x1 && x0 + w0 <= x1 + w1 && y0 + h0 >= y1 && y0 + h0 <= y1 + h1) {
            return true;
        }
    }
}

export var Tools = (() => {
    const idGenerator = () => {
        let id = 0;

        function* __inner__() {
            while (id += 1) yield id;
        }
        return __inner__();
    }
    const ider = idGenerator();
    const guid = () => {
        let S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    const intValue = (num, MAX_VALUE, MIN_VALUE) => (num > MAX_VALUE || num < MIN_VALUE)? num &= 0xFFFFFFFF: num;
    const _watch = (name, obj) => {
        if (name in window.watcher) {
            inner_lock = true;
            window.watcher[name] = obj;
        } else {
            (function(inner_value) {
                Object.defineProperty(window.watcher, name, {
                    get() {
                        return inner_value;
                    },
                    set (val) {
                        if (inner_lock) {
                            inner_lock = false;
                            inner_value = val;
                        }
                    }
                });
            })(obj);
        }
    }
    const _mutter = (msg, level) => {
        let content = `WXY(id:${ider.next().value},lv:wxy_${level}):%c ${msg}`;
        switch (level) {
            case "fatal":
                console.error(content, "color:#750000");
                break;
            case "error":
                console.error(content, "color:#8600FF");
                break;
            case "warn":
                console.warn(content, "color: #005AB5");
                break;
            case "info":
                console.log(content, "color:#02C874");
                break;
            default:
                console.warn(`unknown msg level:${level}`);
                break;
        }
    }
    window.watcher = new Object();
    var inner_lock = false;
    var FULL_FIELD_EVENT_MAP = new Map();
    _watch("paramsTable", ptable);

    return {
        gilgamesh: (name, func) => {
            if (func && typeof(func) == "function") {
                let wkid = name.toUpperCase();
                if (!ptable.events[wkid]) {
                    ptable.events[wkid] = name;
                }
                FULL_FIELD_EVENT_MAP.set(name, func);
            } else {
                _mutter("you must set function to full field function map.", "error");
            }
        },
        getEventByName: (name) => {
            if (FULL_FIELD_EVENT_MAP.has(name)) {
                return FULL_FIELD_EVENT_MAP.get(name);
            } else {
                return () => {};
            }
        },
        identify: (id) => {
            return id.startsWith("#")? id.slice(id.lastIndexOf("#")): "#" + id;
        },
        hashCode: (strKey, max = 0x7fffffff, min = -0x80000000) => {
            var hash = 0;
            if (!(strKey == null || strKey.value == "")) {
                for (var i = 0; i < strKey.length; i++) {
                    hash = hash * 31 + strKey.charCodeAt(i);
                    hash = intValue(hash, max, min);
                }
            }
            return hash;
        },
        watch: (name, obj) => {
            _watch(name, obj);
        },
        sleep: (milliseconds) => {
            var deferred = $.Deferred();
            setTimeout(function () {
                deferred.resolve();
            }, milliseconds);
            return deferred;
        },
        req: (url) => {
            return $.ajax({
                url: url,
                type: "GET",
                dataType: "json"
            });
        },
        calRunTime: (callback) => {
            var curTime = Date.now();
            callback();
            return Date.now() - curTime;
        },
        sGuid: () => {
            return 'xxxxxx-xx-4x-yx-xxxxxxxxxx'.replace(/[xy]/g, (c) => {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        guid: () => {
            return guid();
        },
        honour: () => {
            var wxy = [
                `<--  Macho Tears  -->`, `!!;:;!;;;'\`:!!|||!||!||`, `\`'::''''%##&!:::::::;!!`,
                `\`\`\`';:'':%@%''::::;:::;`, `::::::;%@&&&&$!::;;:'';`, `:::'''!&&&&&&&%;''''::;`,
                `;;:;!;%@&&&&&&@$!!|;::;`, `|!;;:|&&@&&$$&@&$%&$%||`, `|%!|@@$%&&&$$&@#$;';!:;`,
                `'''|@&||&&&&$&@#@%|!;;!`, `::'|&;:$@&&&$$&&@|::::;`, `:':!%$&###@@#&!:;;::':!`,
                `\`'::::%######$:.\`'';!;;`, `;;:::%##@@###@$%!!|$&$|`, `;;!!;&#&!;%##&|!!!!!!!;`,
                `;!!;;$#$;;|&#&|;;;!|||!`, `::;;!$#%!!;$#&|;:::::;;`,
                `\`''\`'%#|':'!@#$'.\`\`\`\`\`:`, `!::::%@|::''!@&|;;;'';;`
            ];
            console.log(`%c ${wxy.join('\n')}`, "color:green");
        },
        mutter: (msg, level) => {
            _mutter(msg, level);
        },
        floatBox: {
            hitTest: (item, items) => {
                for (let i=0; i < items.length; ++i) {
                    if (item != items[i] && item.hitTest(items[i])) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
})();