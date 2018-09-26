define(function () {
    'use strict';

    return {
        onlyone: {
            pane: {
                position: "relative",
                left: "0%",
                top: "1%",
                width: "30%",
                height: "100%"
            },
            rows: [{
                height: 5,
                descrip: "第一行",
                class: "title_row",
                cols: [{
                    type: "title",
                    name: "极地大屏可视化系统",
                    style: "chart_title",
                    height: 5,
                    column: "col-md-8",
                    descrip: "第一列"
                }]
            }, {
                height: 18,
                descrip: "第二行",
                class: "body_row",
                cols: [{
                    type: "chart",
                    width: 50,
                    height: 30,
                    url: "http://localhost:3000/gauge",
                    column: "col-md-6",
                    descrip: "第一列"
                }, {
                    type: "chart",
                    width: 50,
                    height: 30,
                    url: "http://localhost:3000/gauge",
                    column: "col-md-6",
                    descrip: "第二列"
                }]
            }, {
                height: 18,
                descrip: "第二行",
                class: "body_row",
                cols: [{
                    type: "chart",
                    width: 50,
                    height: 30,
                    url: "http://localhost:3000/gauge",
                    column: "col-md-6",
                    descrip: "第一列"
                }, {
                    type: "chart",
                    width: 50,
                    height: 30,
                    url: "http://localhost:3000/gauge",
                    column: "col-md-6",
                    descrip: "第二列"
                }]
            },
            {
                height: 5,
                descrip: "第三行",
                class: "title_row",
                cols: [{
                    type: "title",
                    name: "雪龙船实时信息",
                    style: "chart_title",
                    height: 5,
                    column: "col-md-8",
                    descrip: "第一列"
                }]
            }, {
                height: 18,
                descrip: "第二行",
                class: "body_row",
                cols: [{
                    "type": "chart",
                    "width": 50,
                    "height": 30,
                    "url": "http://localhost:3000/gauge",
                    "column": "col-md-6",
                    "descrip": "第一列"
                },
                {
                    "type": "chart",
                    "width": 30,
                    "height": 30,
                    "url": "http://localhost:3000/gauge",
                    "column": "col-md-6",
                    "descrip": "第二列"
                }
                ]
            }, {
                height: 18,
                descrip: "第二行",
                class: "body_row",
                cols: [{
                    "type": "chart",
                    "width": 50,
                    "height": 30,
                    "url": "http://localhost:3000/gauge",
                    "column": "col-md-6",
                    "descrip": "第一列"
                },
                {
                    "type": "chart",
                    "width": 30,
                    "height": 30,
                    "url": "http://localhost:3000/gauge",
                    "column": "col-md-6",
                    "descrip": "第二列"
                }
                ]
            }
            ]
        }
    };
});