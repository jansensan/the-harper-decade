(function ProtoModule() {

  'use strict';

  angular
    .module('harperdecade.Prototype', [
      'harperdecade.Templates',
      'harperdecade.PrototypeModel'
    ])
    .controller('PrototypeController', PrototypeController)
    .directive('prototype', Prototype);

  function Prototype() {
    return {
      restrict: 'E',
      controller: 'PrototypeController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      templateUrl: '/scripts/components/prototype/prototype-tmpl.html'
    };
  }

  /* @ngInject */
  function PrototypeController(prototypeModel) {
    // public api
    var vm = this;

    // auto activation
    activate();

    // method definitions
    function activate() {
      renderDatasetB();
    }

    function renderDatasetA() {
      d3.select('.chart')
        .selectAll('div')
        .data(prototypeModel.datasetA)
        .enter().append('div')
        .style('height', setHeight);

      function setHeight(dataEntry) {
        var newHeight = (dataEntry * 10) + 'px';
        return newHeight;
      }
    }

    function renderDatasetB() {
      d3.select('.chart')
        .selectAll('div')
        .data(prototypeModel.datasetB)
        .enter().append('div')
        .style('height', setHeight);

      function setHeight(dataEntry) {
        var newHeight = (dataEntry.value * 10) + 'px';
        return newHeight;
      }
    }
  }

})();
