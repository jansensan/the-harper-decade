(function PrototypeModelModule() {

  'use strict';

  angular
    .module('harperdecade.PrototypeModel', [])
    .factory('prototypeModel', PrototypeModel);

  function PrototypeModel() {
    // vars
    var _datasetA = [4, 8, 15, 16, 23, 42];
    var _datasetB = [
      {
        year: 1980,
        value: 50
      },
      {
        year: 1981,
        value: 45
      },
      {
        year: 1982,
        value: 40
      },
      {
        year: 1983,
        value: 35
      },
      {
        year: 1984,
        value: 30
      },
      {
        year: 1985,
        value: 25
      }
    ];

    // public api
    var _model = {
      datasetA: _datasetA,
      datasetB: _datasetB
    }
    return _model;
  }

})();
