define("BasicTools", function (tools) {
    'use strict';
    const PROP_URl = "";  // url of props
    const TICK = 2000;    // cycle of pull props

    function DataPublisher(propsUrl, tick) {
        var subscribers = new Map();

        setInterval(function () {
            $.ajax({
                url: propsUrl,
                type: "GET",
                dataType: "json"
            }).progress(function(option) {
                for (let prop in props) {
                    if (props[prop] && subscribers.has(prop)) {
                        let subs = subscribers.get(prop);
                        for (let name in subs) {
                            !function (url, system_call) {
                                $.ajax({
                                    url: url,
                                    type: "POST",
                                    dataType: "json"
                                }).progress(function(data) {
                                    system_call(data);
                                }).catch(function(e) {
                                    tools.mutter(e, "error");
                                });
                            }(subs[name].url, subs[name].func);
                        }
                    }
                }
            }).catch(function(e) {
                tools.mutter(e, "error");
            });
        }, tick);

        if(!DataPublisher.prototype.add) {
            DataPublisher.prototype.add = function (name, url, callback) {
                if (!subscribers.has(name)) {
                    subscribers.set(name, []);
                }
                if (subscriber && url) {
                    subscribers.get(name).push({
                        url: url,
                        func: new Function("data", callback)
                    });
                }
            }
        }
    }

    return new DataPublisher(PROP_URl, TICK);
});