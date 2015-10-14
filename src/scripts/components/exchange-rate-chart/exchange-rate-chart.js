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
  function ExchangeRateChartController(
    chartLinesRenderer,
    exchangeRateChartModel
  ) {

    // vars
    var _chart, _chartLines;

    // public api
    var vm = this;

    // auto activation
    activate();

    // method definitions
    function activate() {
      // get dom objects
      _chart = d3.select('.exchange-rate-chart');
      _chartLines = d3.select('.chart-lines');

      // add event listener
      exchangeRateChartModel.dataParsed.add(onDataParsed);
    }

    function clearCanvas() {
      _chart.selectAll('*').remove();
    }

    function renderAll() {
      exchangeRateChartModel.barWidth = 8;
      exchangeRateChartModel.paddingX = 1;

      // get data
      var data = exchangeRateChartModel.getBarsData(),
        numEntries = data.length,
        barWidth = exchangeRateChartModel.barWidth,
        paddingX = exchangeRateChartModel.paddingX,
        chartWidth = numEntries * (barWidth + paddingX),
        chartHeight = exchangeRateChartModel.getHeight(),
        parityY = exchangeRateChartModel.getParityY();

      // set chart width
      _chart.attr('width', chartWidth);

      // render bars
      _.forEach(data, function drawBar(n) {
        _chart
          .append('rect')
          .attr('x', n.x)
          .attr('y', n.y)
          .attr('width', n.width)
          .attr('height', n.height)
          .style('fill', 'steelblue')
          .style('fill-opacity', 0.95);
      });

      // render chart lines
      chartLinesRenderer.render(
        _chartLines,
        chartWidth,
        chartHeight,
        parityY
      );
    }

    function renderMonthlyAverages() {
      // get data
      var data = exchangeRateChartModel.getMonthlyAverages();

      // render line data
      _.forEach(data, function drawLine(n) {
        _chart
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
      renderAll();
    }
  }

  function getDependencies() {
    return [
      'harperdecade.components.ChartLinesRenderer',
      'harperdecade.components.ExchangeRateChartModel'
    ];
  }

})();