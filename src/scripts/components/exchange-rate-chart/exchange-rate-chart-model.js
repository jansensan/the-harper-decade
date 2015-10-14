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
      // properties
      paddingX: 4,
      strokeWidth: 2,
      barWidth: 4,
      // methods
      getHeight: getHeight,
      getPointsData: getPointsData,
      getBarsData: getBarsData,
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

    function getHeight() {
      return HEIGHT;
    }

    function getPointsData() {
      // get raw data
      var data = exchangeRateModel.getAll();

      // create line data
      var i = 0,
        px = 0,
        p1, p2,
        lineData = [];
      _.forEach(data, function convertEntryToLineData(n) {
        px = i * _model.paddingX;
        p1 = {x: px, y: HEIGHT};
        p2 = {x: px, y: HEIGHT - (HEIGHT * n.conversion)};
        lineData.push([p1, p2]);
        i++;
      });

      // return points data
      return lineData;
    }

    function getBarsData() {
      // get raw data
      var data = exchangeRateModel.getAll();

      // create rect data
      var i = 0,
        rx = 0,
        ry, rh,
        rectData = [];
      _.forEach(data, function convertEntryToRectData(n) {
        rx = i * (_model.barWidth + _model.paddingX);
        rh = HEIGHT * n.conversion;
        ry = HEIGHT - rh;
        rectData.push({
          x: rx,
          y: ry,
          width: _model.barWidth,
          height: rh
        });
        i++;
      });

      // return rect data
      return rectData;
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
