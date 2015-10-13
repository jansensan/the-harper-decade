(function ExchangeRateChartModule() {

  'use strict';

  angular
    .module('harperdecade.components.ExchangeRateChart', getDependencies())
    .controller('ExchangeRateChartController', ExchangeRateChartController)
    .directive('exchangeRateChart', ExchangeRateChart);

  function ExchangeRateChart() {
    return {
      restrict: 'E',
      controller: 'ExchangeRateChartController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      templateUrl: '/scripts/components/exchange-rate-chart/exchange-rate-chart-tmpl.html'
    };
  }

  /* @ngInject */
  function ExchangeRateChartController(exchangeRateChartModel) {
    // vars
    var _d3,
      _strokeWidth = 2,
      _paddingX = 2;

    // public api
    var vm = this;

    // auto activation
    activate();

    // method definitions
    function activate() {
      // get dom object
      _d3 = d3.select('.exchange-rate-chart');

      // add event listener
      exchangeRateChartModel.dataParsed.add(onDataParsed);
    }

    function clearCanvas() {
      _d3.selectAll('*').remove();
    }

    function renderAllData() {
      // get data
      var data = exchangeRateChartModel.getAll();
      var numEntries = data.length;
      var chartWidth = numEntries * (_strokeWidth + _paddingX);
      var widthValue = chartWidth.toString() + 'px';
      console.log('widthValue: ' + (widthValue));

      // render line data
      _.forEach(data, function drawLine(n) {
        _d3
          .attr('width', chartWidth)
          .append('line')
          .style('stroke', 'steelblue')
          .attr('stroke-width', _strokeWidth.toString())
          .attr('x1', n[0].x)
          .attr('y1', n[0].y + 100)
          .attr('x2', n[1].x)
          .attr('y2', n[1].y + 100);
      });
    }

    function renderMonthlyAverages() {
      // get data
      var data = exchangeRateChartModel.getMonthlyAverages();

      // render line data
      _.forEach(data, function drawLine(n) {
        _d3
          .append('line')
          .style('stroke', 'steelblue')
          .attr('stroke-width', '2')
          .attr('x1', n[0].x)
          .attr('y1', n[0].y)
          .attr('x2', n[1].x)
          .attr('y2', n[1].y);
      });
    }

    // event handlers
    function onDataParsed() {
      clearCanvas();
      renderAllData();
      // renderMonthlyAverages();
    }
  }

  function getDependencies() {
    return [
      'harperdecade.components.ExchangeRateChartModel'
    ];
  }

})();