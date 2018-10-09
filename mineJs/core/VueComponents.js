!function() {
    var singleton = null;
    define(["Vue", "d3","BasicTools","domReady"], function (Vue, d3, tools) {
        'use strict';
        const MAIN_APP_ID = "MainApp";
        function createVueComponentsSingleton() {
            // generate menu events
            var menuButtonEvents = new Map();
    
            // initialize the application
            var mainApp = new Vue({
                el: `#${MAIN_APP_ID}`,
                data: {
                    fakePage: "/polar/cutscene.html",
                    loaded: false,
                    title: "",
                    mbuttons: [],
                    tips: {
                        id: `${MAIN_APP_ID}Tips`,
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

            $(`#${MAIN_APP_ID}Tips`).mouseover(function() {
                layer.tips(mainApp.tips.text, this);
            })
    
            // return the handle of page
            return {
                MainApp: mainApp,
                menuEvents: menuButtonEvents,
                DelayTime: function*(i, step) {
                    while (i += step) yield `animation-delay: ${i}s;-webkit-animation-delay: ${i}s;`;
                }
            };
        }
    
        return singleton? singleton: createVueComponentsSingleton();
    });
}()