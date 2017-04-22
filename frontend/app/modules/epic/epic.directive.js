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
  vm.title = 'Recent EPIC Picture';

  vm.toggleEpicModal = toggleEpicModal;
  vm.spaceEnter = spaceEnter;
  vm.epicModalShown = false;
  vm.epicModalFocus = false;
  vm.epicLastFocus = {};

  function toggleEpicModal() {
    vm.epicModalShown = !vm.epicModalShown;
    vm.epicModalFocus = !vm.epicModalFocus;
    vm.epicLastFocus = document.activeElement;
  }

  function spaceEnter(event) {
    if (event.which === 13 || event.which === 32) {
      vm.toggleEpicModal();
    }
  }

  ApiService.epic().then(function(response) {
    vm.epic = response.data;
  });
}

export default angular.module('epic', [
  ])
  .directive('epic', epic)
  .name;
