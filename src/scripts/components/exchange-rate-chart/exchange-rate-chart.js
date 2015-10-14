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

    function renderChartLines(newWidth) {
      var chartHeight = exchangeRateChartModel.getHeight();

      // clear
      _chartLines.selectAll('*').remove();

      // set dimensions
      _chartLines
        .attr('width', newWidth)
        .attr('height', chartHeight);

      // add 1:1 line
      var oneOneRatioY = chartHeight * 0.25;
      var baseAlpha = 0.5, appliedAlpha = baseAlpha;

      _chartLines
        .append('rect')
        .attr('x', 0)
        .attr('y', oneOneRatioY)
        .attr('width', newWidth)
        .attr('height', 1)
        .style('fill-opacity', appliedAlpha);

      // build data for lines below
      var i = 0, numLoops = 10, linesData = [];
      var size = Math.floor((chartHeight * 0.75) * 0.1);
      for(i; i < numLoops; i++) {
        appliedAlpha *= 0.75;
        linesData.push({
          y: oneOneRatioY + ((i + 1) * size),
          alpha: appliedAlpha
        });
      }

      // draw lines below
      _.forEach(linesData, function drawLineBelow(n) {
        _chartLines
          .append('rect')
          .attr('x', 0)
          .attr('y', n.y)
          .attr('width', newWidth)
          .attr('height', 1)
          .style('fill-opacity', n.alpha);
      });

      // build data for lines above
      i = 0;
      numLoops = 5;
      appliedAlpha = baseAlpha;
      linesData = [];
      for(i; i < numLoops; i++) {
        appliedAlpha *= 0.75;
        linesData.push({
          y: oneOneRatioY - ((i + 1) * size),
          alpha: appliedAlpha
        });
      }

      // draw lines below
      _.forEach(linesData, function drawLineAbove(n) {
        _chartLines
          .append('rect')
          .attr('x', 0)
          .attr('y', n.y)
          .attr('width', newWidth)
          .attr('height', 1)
          .style('fill-opacity', n.alpha);
      });
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
        widthValue = chartWidth.toString() + 'px';

      // set chart width
      _chart.attr('width', chartWidth);

      // render bars
      _.forEach(data, function drawBar(n) {
        _chart
          .append('rect')
          .attr('x', n.x)
          .attr('y', n.y + exchangeRateChartModel.getHeight() * 0.25)
          .attr('width', n.width)
          .attr('height', n.height)
          .style('fill', 'steelblue');
      });

      renderChartLines(chartWidth);
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
      'harperdecade.components.ExchangeRateChartModel'
    ];
  }

})();