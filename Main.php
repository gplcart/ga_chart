<?php

/**
 * @package Google Analytics Charts
 * @author Iurii Makukh <gplcart.software@gmail.com>
 * @copyright Copyright (c) 2018, Iurii Makukh <gplcart.software@gmail.com>
 * @license https://www.gnu.org/licenses/gpl-3.0.en.html GPL-3.0
 */

namespace gplcart\modules\ga_chart;

/**
 * Main class for Google Analytics Charts module
 */
class Main
{
    /**
     * Implements "template.render"
     * @param array $templates
     * @param array $data
     * @param string| null $rendered
     * @param \gplcart\core\Controller $controller
     */
    public function hookTemplateRender($templates, $data, $rendered, $controller)
    {
        $template = reset($templates);

        if (strpos($template, '/modules/ga_report/templates/panels/') !== false
            && isset($data['content']['data']['report']['data'])
            && isset($data['content']['data']['handler']['id'])) {

            $handler_id = $data['content']['data']['handler']['id'];
            $controller->setJsSettings("ga_chart_$handler_id", $data['content']['data']['report']['data']);

            $controller->setJs(__DIR__ . "/js/handlers/$handler_id.js", array('aggregate' => false));
            $controller->setJs(__DIR__ . "/js/common.js", array('aggregate' => false));
        }
    }
}
