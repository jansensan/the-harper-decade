angular.module("harperdecade.Templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/scripts/components/exchange-rate-chart/exchange-rate-chart-tmpl.html","<div class=exchange-rate-chart-component><h2>Exchange Rate Chart</h2><ul class=y-axis-usd><li>1.2</li><li>1.1</li><li>1.0</li><li>0.9</li><li>0.8</li><li>0.7</li><li>0.6</li><li>0.5</li><li>0.4</li><li>0.3</li><li>0.2</li><li>0.1</li><li>0.0</li></ul><div class=chart-container><svg class=exchange-rate-chart></svg><svg class=chart-lines></svg></div></div>");
$templateCache.put("/scripts/components/prototype/prototype-tmpl.html","<p>Chart Prototype:</p><div class=chart></div>");}]);