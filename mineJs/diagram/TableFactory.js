define(["echarts", "BasicTools", "/polar/js/echarts/echarts-liquidfill.min.js"], function (echarts, tools) {
    'use strict';

    // super table generator
    function XPaneLoader(id, config) {
        const FHEIGHT = "height:100%;";
        const guid = tools.sGuid;
        const sstd = (x) => !!x? x: "";
        const nstd = (x) => !isNaN(parseFloat(x))? x: 0;
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
                        if (cols[j]) {
                            let node = cols[j];
                            tbcnt.push(`<div class='${sstd(node.column)}' style='${FHEIGHT}padding-left:1%;padding-right:0;'>`);
                            switch (node.type) {
                                case "title":
                                    tbcnt.push(`<p class='${sstd(node.style)}'>${sstd(node.name)}</p>`);
                                    break;
                                case "chart":
                                    let _id = `ZXJ-${i + 1},${j + 1}-${guid()}`;
                                    tbcnt.push(`<div id='${_id}' style='${FHEIGHT}' class='${sstd(node.class)}'></div>`);
                                    echDelay.push({
                                        id: _id,
                                        url: node.url
                                    });
                                    break;
                                case "capsule":
                                    __row_owner__(node.rows);
                                    break;
                                default:
                                    tools.mutter(`unknown type:${node.type? node.type: "null"}`, "error");
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
                        if (rows[i]) {
                            let row = rows[i];
                            tbcnt.push(`<div class='row ${sstd(row.class)}' style='height:${nstd(row.height)}%;'>`);
                            __col_owner__(i, row, row.cols);
                            tbcnt.push("</div>");
                        } else {
                            let descrip = row.descrip? row.descrip: i + 1;
                            tools.mutter(`row error: ${descrip}`, "error");
                        }
                    }
                }

                // pane processing
                !function() {
                    try {
                        if (config) {
                            if (config.pane) {
                                for (let name in config.pane) {
                                    jqDom.css(name, config.pane[name]);
                                }
                            } else {
                                tools.mutter("pane not in config.", "error");
                            }
                            tbcnt.push(`<div class='container-fluid' style='${FHEIGHT}'>`);
                            if (config.rows) {
                                __row_owner__(config.rows);
                            } else {
                                tools.mutter("rows not in config.", "error");
                            }
                            tbcnt.push("</div>");
                            // echarts 
                            jqDom.append(tbcnt.join('\n'));
                            for (let i = 0; i < echDelay.length; ++i) {
                                let node = echDelay[i];
                                addChart(node.id, node.url);
                            }
                        } else {
                            tools.mutter("config is null", "error");
                        }
                    } catch(e) {
                        tools.mutter(e, "error");
                    }
                }();
            });
        }

        function addChart(id, url) {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (option) {
                    $("#" + id).ready(function () {
                        try {
                            var myChar = echarts.init(document.getElementById(id));
                            myChar.setOption(option);
                            myChar.resize();
                        } catch(e) {
                            tools.mutter(e, "error");
                        }
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