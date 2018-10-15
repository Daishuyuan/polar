import { Tools as tools } from "../basic/BasicTools.js"

export class VueLayer {
    constructor(MASK_HTML_PATH, MAIN_APP_ID) {
        // generate menu events
        var menuButtonEvents = new Map();

        // initialize the application
        var mainApp = new Vue({
            el: tools.identify(MAIN_APP_ID),
            data: {
                fakePage: MASK_HTML_PATH,
                loaded: false,
                title: "",
                mbuttons: []
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