(function ExchangeRateChartModelModule() {

  'use strict';

  angular
    .module('harperdecade.components.ExchangeRateChartModel', getDependencies())
    .factory('exchangeRateChartModel', ExchangeRateChartModel);

  /* @ngInject */
  function ExchangeRateChartModel(exchangeRateModel) {

    // constants
    var HEIGHT = 480,
      PARITY_Y = (5 / 6) * HEIGHT,
      PARITY_RATIO = HEIGHT / PARITY_Y;

    // public api
    var _model = {
      // properties
      paddingX: 4,
      strokeWidth: 2,
      barWidth: 8,
      // methods
      getHeight: getHeight,
      getParityY: getParityY,
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

    function getParityY() {
      return PARITY_Y;
    }

    // TODO: recalculate points positions with parity y
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
        p1 = {x: px, y: PARITY_Y};
        p2 = {x: px, y: PARITY_Y - (PARITY_Y * n.conversion)};
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
        rh = PARITY_Y * n.conversion;
        ry = HEIGHT - rh;
        rectData.push({
          x: rx,
          y: ry,
          width: _model.barWidth,
          height: rh,
          dateString: n.dateString
        });
        i++;
      });

      // return rect data
      return rectData;
    }

    // TODO: recalculate points positions with parity y
    function getMonthlyAverages() {
      // get raw data
      var data = exchangeRateModel.getMonthlyAverages();

      // create line data
      var i = 0;
      var px = 0;
      var lineData = [];
      _.forEach(data, function convertEntryToLineData(n) {
        px = i * 4;
        var p1 = {x: px, y: PARITY_Y};
        var p2 = {x: px, y: PARITY_Y - (PARITY_Y * n.average)};
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
