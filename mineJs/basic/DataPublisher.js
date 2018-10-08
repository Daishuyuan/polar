define(function () {
    'use strict';
    var publisher = new DataPublisher("", 2000);

    function DataPublisher(propsUrl, tick) {
        var subscribers = new Map();

        setInterval(function () {
            $.ajax({
                url: propsUrl,
                type: "POST",
                dataType: "json",
                success: function (props) {
                    for (let prop in props) {
                        if (props[prop] && subscribers.has(prop)) {
                            let subs = subscribers.get(prop);
                            for (let name in subs) {
                                !function (myChart, url) {
                                    $.ajax({
                                        url: url,
                                        type: "GET",
                                        dataType: "json",
                                        success: function (option) {
                                            myChart.setOption(option, true);
                                        }
                                    });
                                }(subs[name].obj, subs[name].url);
                            }
                        }
                    }
                }
            });
        }, tick);

        if(!DataPublisher.prototype.add) {
            DataPublisher.prototype.add = function (name, subscriber, url) {
                if (!subscribers.has(name)) {
                    subscribers.set(name, []);
                }
                if (subscriber && url) {
                    subscribers.get(name).push({
                        obj: subscriber,
                        url: url
                    });
                }
            }
        }
    }

    return publisher;
});