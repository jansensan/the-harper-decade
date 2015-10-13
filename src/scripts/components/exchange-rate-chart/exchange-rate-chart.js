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
  function ExchangeRateChartController(exchangeRateModel) {
    // vars
    var _d3;

    // public api
    var vm = this;

    // auto activation
    activate();

    // method definitions
    function activate() {
      // get dom object
      _d3 = d3.select('.exchange-rate-chart');

      // add event listener
      exchangeRateModel.dataParsed.add(onDataParsed);
    }

    function clearCanvas() {
      _d3.selectAll('*').remove();
    }

    function renderAllData() {
      // TODO: move 2 blocks to model?

      // get data
      var data = exchangeRateModel.getAll();

      // create line data
      var i = 0;
      var px = 0;
      var h = 360;
      var lineData = [];
      _.forEach(data, function convertEntryToLineData(n) {
        px = i * 4;
        var p1 = {x: px, y: h};
        var p2 = {x: px, y: h - (h * n.conversion)};
        i++;
        lineData.push([p1, p2]);
      });

      // render line data
      _.forEach(lineData, function drawLine(n) {
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

    function renderMonthlyAverages() {
      // get data
      var data = exchangeRateModel.getMonthlyAverages();

      // create line data
      var i = 0;
      var px = 0;
      var h = 360;
      var lineData = [];
      _.forEach(data, function convertEntryToLineData(n) {
        px = i * 4;
        var p1 = {x: px, y: h};
        var p2 = {x: px, y: h - (h * n.average)};
        i++;
        lineData.push([p1, p2]);
      });

      // render line data
      _.forEach(lineData, function drawLine(n) {
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
      var highestRate = exchangeRateModel.getHighestConversionRate();
      var lowestRate = exchangeRateModel.getLowestConversionRate();

      // console.log('highestRate: ', highestRate);
      // console.log('lowestRate: ', lowestRate);

      clearCanvas();
      // renderAllData();
      renderMonthlyAverages();
    }
  }

  function getDependencies() {
    return [
      'harperdecade.models.ExchangeRateModel'
    ];
  }

})();