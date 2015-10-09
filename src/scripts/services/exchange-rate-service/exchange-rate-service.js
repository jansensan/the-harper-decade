(function ExchangeRateServiceModule() {

  'use strict';

  angular
    .module('harperdecade.services.ExchangeRateService', [])
    .factory('exchangeRateService', ExchangeRateService);

  /* @ngInject */
  function ExchangeRateService($http) {

    // public api
    var _service = {
      loadCSV: loadCSV
    };
    return _service;

    // method definitions
    function loadCSV() {
      var url = '/assets/data/2005-2015-cad-vs-usd.csv';
      return $http.get(url);
    }
  }

})();
