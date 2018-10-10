import {Tools as tools} from "../basic/BasicTools.js"

export class VueLayer {
    constructor(MASK_HTML_PATH, MAIN_APP_ID) {
        // generate menu events
        var menuButtonEvents = new Map();
    
        // initialize the application
        var mainApp = new Vue({
            el: MAIN_APP_ID,
            data: {
                fakePage: MASK_HTML_PATH,
                loaded: false,
                title: "",
                mbuttons: [],
                tips: {
                    id: `${MAIN_APP_ID.slice(1)}Tips`,
                    cursor: "pointer",
                    position: "absolute",
                    width: "30px",
                    height: "30px",
                    left: "0px",
                    top: "0px",
                    visiable: false,
                    text: ""
                }
            },
            methods: {
                mbtnEvent: function (event) {
                    if (menuButtonEvents.has(event)) {
                        menuButtonEvents.get(event)();
                    } else {
                        layer.msg('暂未实现，敬请期待', {
                            offset: 't',
                            anim: 6
                        });
                        tools.mutter(`uninitialized event: ${event}`, "warn");
                    }
                }
            }
        });

        $(`#${MAIN_APP_ID.slice(1)}Tips`).mouseover(function() {
            layer.tips(mainApp.tips.text, this);
        });

        // private variables
        this.mainApp = mainApp;
        this.menuButtonEvents = menuButtonEvents;
    }

    get menuEvents() {
        return this.menuButtonEvents;
    }

    get application() {
        return this.mainApp;
    }

    init() {
        this.mainApp.loaded = true;
    }
}

export class DelayTime {
    constructor(count, step) {
        this.step = step;
        this.count = count;
    }

    next() {
        this.count += this.step;
        return `animation-delay: ${this.count}s;-webkit-animation-delay: ${this.count}s;`;
    }
}