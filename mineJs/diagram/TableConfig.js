define(function () {
    'use strict';

    return {
        leftPanel: {
            pane: {
                position: "absolute",
                left: "0%",
                top: "10%",
                width: "31%",
                height: "100%"
            },
            rows: [{
                height: 5,
                descrip: "第一行",
                class: "title_row",
                cols: [{
                    type: "title",
                    name: "南极科考站实时气象信息",
                    style: "chart_title",
                    height: 5,
                    column: "col-md-8",
                    descrip: "第一列"
                }]
            }, {
                height: 34,
                descrip: "第二行",
                class: "body_row",
                cols: [{
                        type: "chart",
                        name: "温度",
                        title_class: "title_col",
                        width: 50,
                        height: 30,
                        url: "http://localhost:3000/gauge",
                        column: "col-md-3",
                        descrip: "第一列"
                    }, {
                        type: "chart",
                        name: "气压",
                        title_class: "title_col",
                        width: 50,
                        height: 30,
                        url: "http://localhost:3000/gauge",
                        column: "col-md-3",
                        descrip: "第二列"
                    }, {
                        type: "chart",
                        name: "湿度",
                        title_class: "title_col",
                        width: 50,
                        height: 30,
                        url: "http://localhost:3000/liquidFill",
                        column: "col-md-3",
                        descrip: "第三列"
                    },
                    {
                        type: "chart",
                        name: "风速",
                        title_class: "title_col",
                        width: 30,
                        height: 30,
                        url: "http://localhost:3000/windRose",
                        column: "col-md-3",
                        descrip: "第四列"
                    }
                ]
            }, {
                height: 5,
                descrip: "第三行",
                class: "title_row",
                cols: [{
                    type: "title",
                    name: "雪龙船实时气象信息",
                    style: "chart_title",
                    height: 5,
                    column: "col-md-8",
                    descrip: "第一列"
                }]
            }, {
                height: 34,
                descrip: "第四行",
                class: "body_row",
                cols: [{
                        type: "chart",
                        name: "温度",
                        title_class: "title_col",
                        width: 50,
                        height: 30,
                        url: "http://localhost:3000/gauge",
                        column: "col-md-3",
                        descrip: "第一列"
                    }, {
                        type: "chart",
                        name: "气压",
                        title_class: "title_col",
                        width: 50,
                        height: 30,
                        url: "http://localhost:3000/gauge",
                        column: "col-md-3",
                        descrip: "第二列"
                    }, {
                        type: "chart",
                        name: "湿度",
                        title_class: "title_col",
                        width: 50,
                        height: 30,
                        url: "http://localhost:3000/liquidFill",
                        column: "col-md-3",
                        descrip: "第三列"
                    },
                    {
                        type: "chart",
                        name: "风速",
                        title_class: "title_col",
                        width: 30,
                        height: 30,
                        url: "http://localhost:3000/windRose",
                        column: "col-md-3",
                        descrip: "第四列"
                    }
                ]
            }]
        },
        rightPanel: {
            pane: {
                position: "absolute",
                right: "0%",
                top: "10%",
                width: "35%",
                height: "100%"
            },
            rows: [{
                height: 5,
                descrip: "第一行",
                class: "title_row",
                cols: [{
                    type: "title",
                    name: "激光雷达数据展示",
                    style: "chart_title",
                    height: 5,
                    column: "col-md-8",
                    descrip: "第一列"
                }]
            }, {
                height: 38,
                descrip: "第二行",
                class: "body_row",
                cols: [{
                    type: "chart",
                    name: "地磁数据",
                    title_class: "title_col",
                    width: 50,
                    height: 30,
                    url: "http://localhost:3000/line_geo_all",
                    column: "col-md-6",
                    descrip: "第一列"
                }, {
                    type: "chart",
                    name: "工作电压和实际电压",
                    title_class: "title_col",
                    width: 50,
                    height: 30,
                    url: "http://localhost:3000/line_datazoom",
                    column: "col-md-6",
                    descrip: "第二列"
                }]
            }, {
                height: 5,
                descrip: "第三行",
                class: "title_row",
                cols: [{
                    type: "title",
                    name: "高空物理数据展示",
                    style: "chart_title",
                    height: 5,
                    column: "col-md-8",
                    descrip: "第一列"
                }]
            }, {
                height: 20,
                descrip: "第四行",
                class: "body_row",
                cols: [{
                    type: "chart",
                    name: "地磁X分量",
                    title_class: "title_col",
                    width: 50,
                    height: 30,
                    url: "http://localhost:3000/line_geo",
                    column: "col-md-6",
                    descrip: "第一列"
                }, {
                    type: "chart",
                    name: "地磁Y分量",
                    title_class: "title_col",
                    width: 50,
                    height: 30,
                    url: "http://localhost:3000/line_geo",
                    column: "col-md-6",
                    descrip: "第二列"
                }]
            }, {
                height: 20,
                descrip: "第五行",
                class: "body_row",
                cols: [{
                        type: "chart",
                        name: "地磁Z分量",
                        title_class: "title_col",
                        width: 50,
                        height: 30,
                        url: "http://localhost:3000/line_geo",
                        column: "col-md-6",
                        descrip: "第一列"
                    },
                    {
                        type: "chart",
                        name: "电离层",
                        title_class: "title_col",
                        width: 30,
                        height: 30,
                        url: "http://localhost:3000/windRose",
                        column: "col-md-6",
                        descrip: "第二列"
                    }
                ]
            }]
        }
    };
});