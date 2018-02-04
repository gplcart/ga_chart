/* global window, Gplcart, jQuery */
(function (window, Gplcart, $) {

    "use strict";

    Gplcart.modules.ga_chart = Gplcart.modules.ga_chart || {"draw": {}};

    /**
     * This function is called when Google Chart library is fully loaded
     * @param google
     */
    Gplcart.modules.ga_chart.draw.visit_date = function (google) {

        /**
         * Draw chart when API is loaded
         */
        google.charts.setOnLoadCallback(function () {
            drawChart(google);
        });

        /**
         * Make responsive
         */
        $(window).resize(function () {
            drawChart(google);
        });
    };

    /**
     * Callback to draw chart
     * @param google
     * @link https://developers.google.com/chart/interactive/docs/gallery/piechart
     */
    var drawChart = function (google) {

        var handler = 'visit_date';
        var key = 'ga_chart_' + handler;

        if (Gplcart.settings[key] && Gplcart.settings[key].rows) {

            var container = $('div#ga-report-panel-' + handler + ' .panel-body');

            var data = [
                [Gplcart.text('Date'), Gplcart.text('Pageviews')]
            ];

            for (var i in Gplcart.settings[key].rows) {
                if (Gplcart.settings[key].rows.hasOwnProperty(i)) {

                    var date = Gplcart.settings[key].rows[i]['ga:date'];

                    var year = date.slice(0, 4);
                    var month = date.slice(4, 6);
                    var day = date.slice(6, 8);

                    data.push([day + '/' + month + '/' + year, parseInt(Gplcart.settings[key].rows[i]['ga:pageviews'])]);
                }
            }

            var options = {
                vAxis: {minValue: 100},
                legend: {position: 'none'},
                hAxis: {slantedText: true},
                chartArea: {width: container.innerWidth() - 50}
            };

            var chart = new google.visualization.LineChart(container[0]);
            chart.draw(google.visualization.arrayToDataTable(data), options);
        }
    };

})(window, Gplcart, jQuery);
