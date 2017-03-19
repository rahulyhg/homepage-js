'use strict';

import angular from 'angular';

function epic() {
  return {
    restrict: 'E',
    bindToController: {},
    scope: {},
    template: require('./epic-template.html'),
    controller: epicController,
    controllerAs: 'vm'
  }
}

epicController.$inject = [];

function epicController() {
  var vm = this;

  vm.message1 = "epic!!!";
}

export default angular.module('epic', [
  ])
  .directive('epic', epic)
  .name;
