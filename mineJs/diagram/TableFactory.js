
/**
 * TableFactory 图表配置工厂
 * @author dsy 2018-10-08
 * @summary 在给定的Div中依据配置信息生成并加载对应的图表,配置信息格式如下：
 * oneTablePane {} -> pane {} -> 浮动面板的css配置
 *                 -> rows [] -> row {} -> descrip 行描述信息
 *                                      -> height 行高度 >= 0
 *                                      -> class css样式类名
 *                                      -> cols [] -> col {} -> type 类型 = title/chart/capsule
 *                                                           -> name(title/chart) 标题名称
 *                                                           -> title_class(chart) 标题的css类名
 *                                                           -> style(title/chart) 主体的css类名
 *                                                           -> height(title/chart) 列高度 >= 0
 *                                                           -> descrip(all) 列描述信息
 *                                                           -> column(all) 列样式，如col-md-?
 *                                                           -> url(chart) 图表加载的数据源地址
 *                                                           -> src(chart) 加载的数据源的名称
 * @requires jQuery
 * @requires echarts
 * @requires echarts-liquidfill
 * @requires BasicTools
 * @requires bootstrap
 * @exports XPaneLoader(图表配置工厂类对象)
**/
define(["echarts", "BasicTools", "/polar/js/echarts/echarts-liquidfill.min.js"], function (echarts, tools) {
    'use strict';

    // super table generator
    function XPaneLoader() {
        const TITLE_DEFAULT_HEIGHT = 10;
        const guid = tools.sGuid;
        const sstd = (x) => !!x ? x : "";
        const nstd = (x) => !isNaN(parseFloat(x)) && x > 0? x : 0;

        // outter functions
        if (!XPaneLoader.prototype.generate) {
            XPaneLoader.prototype.generate = function (id, config) {
                let dom = document.createElement("div");
                __init__($(dom), config);
                $(id).append(dom);
            };
        }

        // initialization by configuration
        function __init__(jqDom, config) {
            jqDom.ready(function () {
                var tbcnt = [],
                    echDelay = [];

                // cols processing
                function __col_owner__(i, row, cols) {
                    for (let j = 0; j < cols.length; j++) {
                        if (cols[j]) {
                            let node = cols[j];
                            tbcnt.push(`<div class='${sstd(node.column)}' style='height:100%;padding-left:1%;padding-right:0;'>`);
                            switch (node.type) {
                                case "title":
                                    tbcnt.push(`<p class='${sstd(node.style)}'>${sstd(node.name)}</p>`);
                                    break;
                                case "chart":
                                    let _id = `ZXJ-${i + 1},${j + 1}-${guid()}`,
                                        height = node.title_height ? node.title_height : TITLE_DEFAULT_HEIGHT,
                                        content_title = `<p style='margin:0;'>${sstd(node.name)}</p>`;
                                    height = Math.min(Math.max(0, height), 100);
                                    tbcnt.push(`<div class='${sstd(node.title_class)}' style="height: ${height}%;text-align: center;margin:0;">${content_title}</div>`);
                                    tbcnt.push(`<div id='${_id}' style='height:${100 - height}%;' class='${sstd(node.style)}'></div>`);
                                    echDelay.push({
                                        id: _id,
                                        url: node.url
                                    });
                                    break;
                                case "capsule":
                                    __row_owner__(node.rows);
                                    break;
                                default:
                                    tools.mutter(`unknown type:${node.type ? node.type : "null"}`, "error");
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
                            let descrip = row.descrip ? row.descrip : i + 1;
                            tools.mutter(`row error: ${descrip}`, "error");
                        }
                    }
                }

                !function () {
                    try {
                        if (config) {
                            if (config.pane) {
                                for (let name in config.pane) {
                                    jqDom.css(name, config.pane[name]);
                                }
                            } else {
                                tools.mutter("pane not in config.", "error");
                            }
                            tbcnt.push(`<div class='container-fluid' style='height:100%;'>`);
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
                    } catch (e) {
                        tools.mutter(e, "error");
                    }
                }();
            });
        }

        // generate charts
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
                            if (option.series[0].type === "gauge") {
                                setInterval(function () {
                                    option.series[0].data[0].value = (Math.random() * 100 + 1).toFixed(1) - 0;
                                    myChar.setOption(option, true);
                                }, 2000);
                            }
                        } catch (e) {
                            tools.mutter(e, "error");
                        }
                    });
                }
            });
        }
    }

    return new XPaneLoader();
});