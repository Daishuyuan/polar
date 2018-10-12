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
    window.watcher = {};
    var inner_lock = false;

    return {
        watch: (name, obj) => {
            if (name in window.watcher) {
                inner_lock = true;
                window.watcher[name] = obj;
            } else {
                (function() {
                    var inner_value = obj;
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
                })();
            }
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
                `<--  Macho Tears  -->`,
                `!!;:;!;;;'\`:!!|||!||!||`,
                `\`'::''''%##&!:::::::;!!`,
                `\`\`\`';:'':%@%''::::;:::;`,
                `::::::;%@&&&&$!::;;:'';`,
                `:::'''!&&&&&&&%;''''::;`,
                `;;:;!;%@&&&&&&@$!!|;::;`,
                `|!;;:|&&@&&$$&@&$%&$%||`,
                `|%!|@@$%&&&$$&@#$;';!:;`,
                `'''|@&||&&&&$&@#@%|!;;!`,
                `::'|&;:$@&&&$$&&@|::::;`,
                `:':!%$&###@@#&!:;;::':!`,
                `\`'::::%######$:.\`'';!;;`,
                `;;:::%##@@###@$%!!|$&$|`,
                `;;!!;&#&!;%##&|!!!!!!!;`,
                `;!!;;$#$;;|&#&|;;;!|||!`,
                `::;;!$#%!!;$#&|;:::::;;`,
                `\`''\`'%#|':'!@#$'.\`\`\`\`\`:`,
                `!::::%@|::''!@&|;;;'';;`
            ];
            console.log(`%c ${wxy.join('\n')}`, "color:green");
        },
        mutter: (msg, level) => {
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
    }
})();