define(function () {
    function DataReceiver() {
        'use strict';

        DataReceiver.prototype.get = function (rawData, x, y, width, height) {
            // request data
            var scale = 100;
            $.ajax("/csv/field_" + [x, y, width, height].join('_')).done(function (data) {
                var rows = data.split("\n").filter(x => x.length !== 0),
                    max = 0,
                    i = 0,
                    j = 0,
                    avg = 0,
                    matrix = [];
                for (i = 0; i < rows.length; ++i) {
                    var row = rows[i].split(",").map(x => parseInt(x)),
                        _max = 0,
                        _avg = 0;
                    for (j = 0; j < row.length; ++j) {
                        _avg += row[j];
                        if (_max < row[j]) {
                            _max = row[j];
                        }
                    }
                    avg += _avg / row.length;
                    if (max < _max) {
                        max = _max;
                    }
                    matrix.push(row);
                }
                avg /= rows.length;
                rawData.avg = !rawData.avg ? avg : rawData.avg;
                matrix = matrix.map(row => row.map(x => parseFloat((x - rawData.avg) * scale / max)));
                rawData.matrix = matrix;
                rawData.width = width;
                rawData.height = height;
                rawData.x = x;
                rawData.y = y;
            });
        }
    }

    return DataReceiver;
});