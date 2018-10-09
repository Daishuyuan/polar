define(function () {
    'use strict';
    var publisher = new DataPublisher("", 2000);

    function DataPublisher(propsUrl, tick) {
        var subscribers = new Map();

        setInterval(function () {
            $.ajax({
                url: propsUrl,
                type: "GET",
                dataType: "json",
                success: function (props) {
                    for (let prop in props) {
                        if (props[prop] && subscribers.has(prop)) {
                            let subs = subscribers.get(prop);
                            for (let name in subs) {
                                !function (url, func) {
                                    $.ajax({
                                        url: url,
                                        type: "POST",
                                        dataType: "json",
                                        success: function (data) {
                                            func(data);
                                        }
                                    });
                                }(subs[name].url, subs[name].func);
                            }
                        }
                    }
                }
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
                        func: callback
                    });
                }
            }
        }
    }

    return publisher;
});