'use strict';

import angular from 'angular';

function weather() {
  return {
    restrict: 'E',
    bindToController: {},
    scope: {},
    template: require('./weather-template.html'),
    controller: weatherController,
    controllerAs: 'vm'
  }
}

weatherController.$inject = [];

function weatherController() {
  var vm = this;

  vm.message1 = "weather!!!";
}

export default angular.module('weather', [
  ])
  .directive('weather', weather)
  .name;
