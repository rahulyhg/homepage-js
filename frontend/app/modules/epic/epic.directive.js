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

epicController.$inject = ['$http', 'ApiService'];

function epicController($http, ApiService) {
  var vm = this;

  vm.type = {};
  // vm.type = 'natural';
  vm.title = 'Recent EPIC Picture';

  vm.toggleEpicModal = toggleEpicModal;
  vm.epicModalShown = false;

  function toggleEpicModal() {
    vm.epicModalShown = !vm.epicModalShown;
  }

  ApiService.epic().then(function(response) {
    vm.epic = response.data;
    console.log(vm.epic);
  });
}

export default angular.module('epic', [
  ])
  .directive('epic', epic)
  .name;
