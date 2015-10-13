(function ExchangeRateChartModelModule() {

  'use strict';

  angular
    .module('harperdecade.components.ExchangeRateChartModel', getDependencies())
    .factory('exchangeRateChartModel', ExchangeRateChartModel);

  /* @ngInject */
  function ExchangeRateChartModel(exchangeRateModel) {

    // constants
    var HEIGHT = 360;

    // public api
    var _model = {
      // methods
      getAll: getAll,
      // signals
      dataParsed: new signals.Signal()
    };

    // auto initialization
    init();

    // return public api
    return _model;

    // method definitions
    function init() {
      // add event listener
      exchangeRateModel.dataParsed.add(_model.dataParsed.dispatch);
    }

    function getAll() {
      // get raw data
      var data = exchangeRateModel.getAll();

      // create line data
      var i = 0;
      var px = 0;
      var lineData = [];
      _.forEach(data, function convertEntryToLineData(n) {
        px = i * 4;
        var p1 = {x: px, y: HEIGHT};
        var p2 = {x: px, y: HEIGHT - (HEIGHT * n.conversion)};
        i++;
        lineData.push([p1, p2]);
      });

      // return points data
      return lineData;
    }

    function getMonthlyAverages() {
      // get raw data
      var data = exchangeRateModel.getMonthlyAverages();

      // create line data
      var i = 0;
      var px = 0;
      var lineData = [];
      _.forEach(data, function convertEntryToLineData(n) {
        px = i * 4;
        var p1 = {x: px, y: HEIGHT};
        var p2 = {x: px, y: HEIGHT - (HEIGHT * n.average)};
        i++;
        lineData.push([p1, p2]);
      });

      // return points data
      return lineData;
    }
  }

  function getDependencies() {
    return [
      'harperdecade.models.ExchangeRateModel'
    ];
  }

})();
