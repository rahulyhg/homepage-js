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

    if ($rootScope.mobileLogoTabIndex === 0) {
      vm.device = 'mobile';
    }

    if ($rootScope.tabletLogoTabIndex === 0) {
      vm.device = 'tablet';
    }

    if ($rootScope.desktopLogoTabIndex === 0) {
      vm.device = 'desktop';
    }

    $rootScope.modalOpen = true;
    $rootScope.tabIndex = -1;
    $rootScope.modalTabIndex = 0;
    $rootScope.mobileLogoTabIndex = -1;
    $rootScope.tabletLogoTabIndex = -1;
    $rootScope.desktopLogoTabIndex = -1;
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
