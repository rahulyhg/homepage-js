'use strict';

import angular from 'angular';

function epicModal() {
  return {
    restrict: 'E',
    bindToController: {
      epicModalShown: '=',
      epicModalFocus: '=',
      epicLastFocus: '=',
      device: '='
    },
    scope: {},
    transclude: true,
    template: require('./epic.modal.html'),
    controller: epicModalController,
    controllerAs: 'vm',
  }
}

epicModalController.$inject = ['$rootScope'];

function epicModalController($rootScope) {
  var vm = this;

  vm.hideEpicModal = hideEpicModal;
  vm.escape = escape;

  function hideEpicModal() {

    if (vm.device === 'mobile') {
      $rootScope.mobileLogoTabIndex = 0;
      $rootScope.tabletLogoTabIndex = -1;
      $rootScope.desktopLogoTabIndex = -1;
    }

    if (vm.device === 'tablet') {
      $rootScope.mobileLogoTabIndex = -1;
      $rootScope.tabletLogoTabIndex = 0;
      $rootScope.desktopLogoTabIndex = -1;
    }

    if (vm.device === 'desktop') {
      $rootScope.mobileLogoTabIndex = -1;
      $rootScope.tabletLogoTabIndex = -1;
      $rootScope.desktopLogoTabIndex = 0;
    }

    $rootScope.modalOpen = false;
    $rootScope.tabIndex = 0;
    $rootScope.modalTabIndex = -1;
    vm.epicModalShown = false;
    vm.epicModalFocus = false;
    vm.epicLastFocus.focus();
  }

  function escape(event) {
    if (event.which === 27) {
      vm.hideEpicModal();
    }
  }

}

export default angular.module('epicModal', [
  ])
  .directive('epicModal', epicModal)
  .name;
