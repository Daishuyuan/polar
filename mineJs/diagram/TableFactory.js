define(["Echarts", "BasicTools"], function (echarts, tools) {
    'use strict';

    // super table generator
    function XPaneLoader(id, config) {
        const FHEIGHT = "height:100%;";
        const guid = tools.sGuid;
        (function () {
            let dom = document.createElement("div");
            __init__($(dom));
            $(id).append(dom);
        })();

        // initialization by configuration
        function __init__(jqDom) {
            jqDom.ready(function () {
                var tbcnt = [],
                    echDelay = [];

                // cols processing
                function __col_owner__(i, row, cols) {
                    for (let j = 0; j < cols.length; j++) {
                        let node = cols[j];
                        if (node.column) {
                            tbcnt.push(`<div class='${node.column}' style='${FHEIGHT}'>`);
                            switch (node.type) {
                                case "title":
                                    tbcnt.push(`<p class='${node.style}'>${node.name}</p>`);
                                    break;
                                case "chart":
                                    let _id = `ZXJ-${i + 1},${j + 1}-${guid()}`;
                                    tbcnt.push(`<div id='${_id}' style='${FHEIGHT}'></div>`);
                                    echDelay.push({
                                        id: _id,
                                        url: node.url
                                    });
                                    break;
                                case "capsule":
                                    __row_owner__(node.rows);
                                    break;
                                default:
                                    tools.mutter(`unknown type:${node.type}`, "error");
                                    break;
                            }
                            tbcnt.push("</div>");
                        } else {
                            let vrow = row.descrip ? row.descrip : i + 1,
                                vcol = node.descrip ? node.descrip : j + 1;
                            tools.mutter(`column error: ${vrow}-${vcol}`, "error");
                        }
                    }
                }

                // rows processing
                function __row_owner__(rows) {
                    for (let i = 0; i < rows.length; i++) {
                        let row = rows[i],
                            height = parseInt(row.height);
                        if (!isNaN(height)) {
                            tbcnt.push(`<div class='row ${row.class}' style='height:${height}%'>`);
                            __col_owner__(i, row, row.cols);
                            tbcnt.push("</div>");
                        } else {
                            tools.mutter(`row error: ${row.descrip? row.descrip: i + 1}`, "error");
                        }
                    }
                }

                // pane processing
                !function() {
                    if (config.pane) {
                        for (let name in config.pane)
                            jqDom.css(name, config.pane[name]);
                    } else {
                        console.error("pane not in config.");
                    }
                    tbcnt.push(`<div class='container-fluid' style='${FHEIGHT}'>`);
                    if (config.rows) {
                        __row_owner__(config.rows);
                    } else {
                        tools.mutter("rows not in config.", "error");
                    }
                    tbcnt.push("</div>");
                    jqDom.append(tbcnt.join('\n'));
                    for (let i = 0; i < echDelay.length; ++i) {
                        let node = echDelay[i];
                        addChart(node.id, node.url);
                    }
                }();
            });
        }

        function addChart(id, url) {
            $.ajax({
                url: url, //json文件位置
                type: "GET", //请求方式为get
                dataType: "json", //返回数据格式为json
                success: function (option) { //请求成功完成后要执行的方法
                    $("#" + id).ready(function () {
                        var myChar = echarts.init(document.getElementById(id));
                        myChar.setOption(option);
                        // setInterval(function () {
                        // 	option.series[0].data[0].value = (Math.random() * 100 + 1).toFixed(1) - 0;
                        // 	myChar.setOption(option, true);
                        // }, 2000);
                    });
                }
            });
        }
    }

    return XPaneLoader;
});