/* global window, Gplcart, jQuery */
(function (window, Gplcart, $) {

    "use strict";

    Gplcart.modules.ga_chart = Gplcart.modules.ga_chart || {"draw": {}};

    /**
     * This function is called when Google Chart library is fully loaded
     * @param google
     */
    Gplcart.modules.ga_chart.draw.keyword = function (google) {
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

        var handler = 'keyword';
        var key = 'ga_chart_' + handler;
        var container = $('div#ga-report-panel-' + handler + ' .panel-body');

        if (Gplcart.settings[key] && Gplcart.settings[key].rows) {

            var data = [[Gplcart.text('Keyword'), Gplcart.text('Pageviews')]];

            for (var i in Gplcart.settings[key].rows) {
                if (Gplcart.settings[key].rows.hasOwnProperty(i)) {
                    data.push([
                        Gplcart.settings[key].rows[i]['ga:keyword'],
                        parseInt(Gplcart.settings[key].rows[i]['ga:pageviews'])
                    ]);
                }
            }

            var options = {
                height: 200,
                chartArea: {width: container.innerWidth() - 50}
            };

            var chart = new google.visualization.PieChart(container[0]);
            chart.draw(google.visualization.arrayToDataTable(data), options);
        }
    };

})(window, Gplcart, jQuery);
