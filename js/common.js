/* global Gplcart, jQuery, google, document */
(function (document, Gplcart, $) {

    "use strict";

    /**
     * Load Google Chart library when DOM is ready
     */
    Gplcart.onload.loadGoogleChartLibrary = function () {
        if (typeof google === 'undefined' || typeof google.charts === 'undefined') {
            $.getScript('https://www.gstatic.com/charts/loader.js', function () {
                if (google !== 'undefined' && google.charts !== 'undefined') {
                    google.charts.load('current', {'packages': ['corechart']});
                    if (Gplcart.modules.ga_chart && Gplcart.modules.ga_chart.draw) {
                        for (var handler in Gplcart.modules.ga_chart.draw) {
                            if (Gplcart.modules.ga_chart.draw.hasOwnProperty(handler)
                                && $.isFunction(Gplcart.modules.ga_chart.draw[handler])) {
                                Gplcart.modules.ga_chart.draw[handler](google);
                            }

                        }
                    }
                }
            });
        }
    };

})(document, Gplcart, jQuery);