import { Tools as tools } from "./BasicTools.js"

export class DataPublisher {
    constructor(propsUrl, tick) {
        this.subscribers = new Map();
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
    }

    subscrib(name, url, callback) {
        if (!this.subscribers.has(name)) {
            this.subscribers.set(name, []);
        }
        if (this.subscriber && url) {
            this.subscribers.get(name).push({
                url: url,
                func: new Function("data", callback)
            });
        }
    }
}