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

epicController.$inject = ['$http', 'ApiService', '$rootScope'];

function epicController($http, ApiService, $rootScope) {
  var vm = this;

  vm.type = {};
  vm.title = 'Recent EPIC Picture';

  vm.toggleEpicModal = toggleEpicModal;
  vm.spaceEnter = spaceEnter;
  vm.epicModalShown = false;
  vm.epicModalFocus = false;
  vm.epicLastFocus = {};

  function toggleEpicModal() {
    $rootScope.modalOpen = true;
    $rootScope.tabIndex = -1;
    $rootScope.modalTabIndex = 0;
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
