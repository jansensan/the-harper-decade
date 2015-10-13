(function ExchangeRateModelModule() {

  'use strict';

  angular
    .module('harperdecade.models.ExchangeRateModel', getDependencies())
    .factory('exchangeRateModel', ExchangeRateModel);

  /* @ngInject */
  function ExchangeRateModel(exchangeRateService) {

    // vars
    var _data = [];

    // public api
    var _model = {
      // properties
      isFetchingData: false,
      // methods
      getAll: getAllChronologically,
      getYearlyAverages: getYearlyAveragesChronologically,
      getMonthlyAverages: getMonthlyAveragesChronologically,
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
          _data.push(rate);
        }
      });

      _model.dataParsed.dispatch();

      // test
      getMonthlyAverages();
    }

    function clearData() {
      _data.length = 0;
      _data = null;
      _data = [];
    }

    function getAllChronologically() {
      return _.sortByOrder(_data, ['dateString'], ['asc']);
    }

    function getYearlyAveragesChronologically() {
      return _.sortByOrder(getYearlyAverages(), ['year'], ['asc']);
    }

    function getMonthlyAveragesChronologically() {
      return _.sortByOrder(getMonthlyAverages(), ['year', 'month'], ['asc']);
    }

    function getHighestConversionRate() {
      return _.max(_data, 'conversion');
    }

    function getLowestConversionRate() {
      return _.min(_data, 'conversion');
    }

    function getYearlyAverages() {
      var years = [];
      var yearData;

      // loop through all data to sort per year
      _.forEach(_data, function iterateThroughAllData(n) {
        checkForNewYear(n);
        yearData.rates.push(parseFloat(n.conversion));
      });

      // loop through year data to create average
      _.forEach(years, function iterateThoughYearlyData(n) {
        var numEntries = n.rates.length;
        n.average = _.sum(n.rates) / numEntries;
      });

      // return data
      return years;

      // method definitions
      function checkForNewYear(item) {
        // dto doesnt exist, create first
        if (_.isUndefined(yearData)) {
          addNewYearData(item.moment.year());

        // dto exist, but data moved to new year
        // create new dto
        } else {
          if (yearData.year !== item.moment.year()) {
            addNewYearData(item.moment.year());
          }
        }
      }

      function addNewYearData(newYear) {
        yearData = {
          year: newYear,
          rates: [],
          average: -1
        };
        years.push(yearData);
      }
    }

    function getMonthlyAverages() {
      var months = [];
      var monthData;

      // loop through all data to sort per month
      _.forEach(_data, function iterateThroughAllData(n) {
        // console.log('n.moment.year(): ', n.moment.year());
        // console.log('n: ', n);
        checkForNewMonth(n);
        monthData.rates.push(parseFloat(n.conversion));
      });

      // loop through month data to create average
      _.forEach(months, function iterateThoughMonthlyData(n) {
        var numEntries = n.rates.length;
        n.average = _.sum(n.rates) / numEntries;
      });

      // return data
      return months;

      // method definitions
      function checkForNewMonth(item) {
        // dto doesnt exist, create first
        if (_.isUndefined(monthData)) {
          addNewMonthData(item.moment);

        // dto exist, but data moved to new year
        // create new dto
        } else {
          if (monthData.month !== item.moment.month()) {
            addNewMonthData(item.moment);
          }
        }
      }

      function addNewMonthData(moment) {
        monthData = {
          year: moment.year(),
          month: moment.month(),
          rates: [],
          average: -1
        };
        months.push(monthData);
      }
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