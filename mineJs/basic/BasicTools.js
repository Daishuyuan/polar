define(["/polar/js/threeJs/Detector.js", "/polar/js/threeJs/extras/libs/system.min.js"], function (Detector, System) {
    'use strict';
    const generator = idGenerator();

    function guid() {
        let S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function idGenerator() {
        let id = 0;
        function *idGenerator() {
            while(id+=1) yield id;
        }
        return idGenerator();
    }

    return {
        envirNotPermit: function () {
            for (var column in System.support) {
                if (!System.support[column]) {
                    throw new Error(`the module of ${column} can't be linked.`);
                }
            }
            if (!Detector.webgl) {
                throw new Error(`webgl error: ${Detector.getWebGLErrorMessage()}`);
            }
            return false;
        },
        sleep: function (milliseconds) {
            var deferred = $.Deferred();
            setTimeout(function () {
                deferred.resolve();
            }, milliseconds);
            return deferred;
        },
        calRunTime: function (callback) {
            var curTime = Date.now();
            callback();
            return Date.now() - curTime;
        },
        sGuid: function () {
            return 'xxxxxx-xx-4x-yx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        guid: function () {
            return guid();
        },
        honour: function () {
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
        mutter: function (msg, level) {
            let content = `WXY(id:${generator.next().value},lv:wxy_${level}):%c ${msg}`;
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
});