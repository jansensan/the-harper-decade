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
    // public api
    var vm = this;

    // auto activation
    activate();

    // method definitions
    function activate() {
      exchangeRateModel.dataParsed.add(onDataParsed);
    }

    function render() {
      var data = exchangeRateModel.getFromPastToPresent();

      d3.select('.chart')
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .style('height', setHeight);

      function setHeight(dataEntry) {
        var value = (dataEntry.usd * 1000) - 725;
        var newHeight = value + 'px';
        return newHeight;
      }
    }

    // event handlers
    function onDataParsed() {
      render();
    }
  }

  function getDependencies() {
    return [
      'harperdecade.models.ExchangeRateModel'
    ];
  }

})();