define(function () {
    'use strict';

    return {
        onlyone: {
            pane: {
                position: "relative",
                left: "0%",
                top: "1%",
                width: "40%",
                height: "80%"
            },
            rows: [{
                height: 5,
                descrip: "第一行",
                class: "test_row",
                cols: [{
                    type: "title",
                    name: "极地大屏可视化系统",
                    style: "chart_title",
                    height: 5,
                    column: "col-md-6",
                    descrip: "第一列"
                }, {
                    type: "capsule",
                    descrip: "内部",
                    column: "col-md-6",
                    rows: [{
                        height: 40,
                        descrip: "内部分行",
                        cols: [{
                            type: "title",
                            name: "1",
                            style: "chart_title",
                            height: 5,
                            column: "col-md-4",
                            descrip: "第一列"
                        }, {
                            type: "title",
                            name: "2",
                            style: "chart_title",
                            height: 5,
                            column: "col-md-4",
                            descrip: "第二列"
                        }]
                    }]
                }]
            }, {
                height: 40,
                descrip: "第二行",
                cols: [{
                    type: "chart",
                    width: 30,
                    height: 30,
                    url: "http://localhost:3000/gauge",
                    column: "col-md-4",
                    descrip: "第一列"
                }, {
                    type: "chart",
                    width: 30,
                    height: 30,
                    url: "http://localhost:3000/gauge",
                    column: "col-md-4",
                    descrip: "第二列"
                }, {
                    type: "chart",
                    width: 30,
                    height: 30,
                    url: "http://localhost:3000/liquidFill",
                    column: "col-md-4",
                    descrip: "第三列"
                }]
            }, {
                height: 5,
                descrip: "第三行",
                cols: [{
                    type: "title",
                    name: "呵呵",
                    style: "chart_title",
                    height: 5,
                    column: "col-md-6",
                    descrip: "第一列"
                }]
            }]
        }
    };
});