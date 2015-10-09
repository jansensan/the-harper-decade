(function ExchangeRateModelModule() {

  'use strict';

  angular
    .module('harperdecade.models.ExchangeRateModel', getDependencies())
    .factory('exchangeRateModel', ExchangeRateModel);

  /* @ngInject */
  function ExchangeRateModel(exchangeRateService) {

    // public api
    var _model = {
      // properties
      data: [],
      isFetchingData: false,
      // methods
      getFromPastToPresent: getFromPastToPresent,
      getHighestConversionRate: getHighestConversionRate,
      getLowestConversionRate: getLowestConversionRate,
      // signals
      dataParsed: new signals.Signal()
    };

    // auto initialization
    init();

    // return public api
    return _model;

    // method definitions
    function init() {
      loadCSV();
    }

    function loadCSV() {
      _model.isFetchingData = true;
      exchangeRateService.loadCSV().then(
        onCSVLoaded,
        onFailedToLoadCSV
      );
    }

    function parseCSV(csv) {
      // split csv string into array
      var csv = csv.split('\n');

      // remove the first 3 lines, which are useless strings
      csv = _.drop(csv, 3);

      // clear if anything is saved
      clearData();

      // get valid lines
      _.forEach(csv, function getValidEntry(n) {
        var entry = n.split(',');

        // check if 2nd entry is a number
        // if not, it's a bank holiday
        // if it is a number, save the data
        var usd = parseFloat(entry[1]);
        if (!isNaN(usd)) {
          var rate = {
            dateString: entry[0],
            moment: moment(entry[0]),
            usd: usd,
            conversion: parseFloat(entry[2]),
            reciprocal: parseFloat(entry[3])
          }
          _model.data.push(rate);
        }
      });

      _model.dataParsed.dispatch();
    }

    function clearData() {
      _model.data.length = 0;
      _model.data = null;
      _model.data = [];
    }

    function getFromPastToPresent() {
      var sorted = _.sortByOrder(_model.data, ['dateString'], ['asc']);
      return sorted;
    }

    function getHighestConversionRate() {
      return _.max(_model.data, 'conversion');
    }

    function getLowestConversionRate() {
      return _.min(_model.data, 'conversion');
    }

    function getMethodSignature(methodName) {
      return 'harperdecade.models.ExchangeRateModel#' + methodName;
    }

    function getErrorPrefix(methodName) {
      return 'Error at ' + getMethodSignature(methodName) + ': ';
    }

    // event handlers
    function onCSVLoaded(response) {
      _model.isFetchingData = false;
      parseCSV(response.data);
    }

    function onFailedToLoadCSV(error) {
      _model.isFetchingData = false;

      var message = getErrorPrefix('onFailedToLoadCSV') +
        'An error occured while trying to load data CSV.'
      console.error(message, error);
    }
  }

  function getDependencies() {
    return [
      'harperdecade.services.ExchangeRateService'
    ];
  }

})();