import { Tools as tools } from "./BasicTools.js"

class ReqHashTable {
    constructor(len) {
        this.MAGIC_NUM = 0x9e353f7c;
        this.nextIndex = (i) => i + 1 >= len? 0: i + 1;
        if (len > 2**4 && !(len & (len - 1))) {
            this.len = len;
            this.threshold = parseInt(len * 2 / 3);
            this.cycleArr = [];
            this.size = 0;
        } else {
            tools.mutter(`len: ${len} must be the power of 2!`, "error");
        }
    }

    addRes(name, params, data) {
        let url = name + params,
            hashcode = tools.hashCode(url, 0xFFFFFFFF, 0x0),
            index = (hashcode + this.MAGIC_NUM) & (this.len - 1);
        this.size++;
        if (!this.cycleArr[index]) {
            this.cycleArr[index] = {
                url: name + params,
                data: data
            };
        } else if (this.cycleArr[index].url === url) {
            this.cycleArr[index].data = data;
        } else {
            while(this.cycleArr[index = this.nextIndex(index, this.len)]);
            this.cycleArr[index] = {
                url: name + params,
                data: data
            };
        }
        if (this.size >= this.threshold) {
            this.len *= 2;
            this.threshold = parseInt(this.len * 2 / 3);
        }
    }
}

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