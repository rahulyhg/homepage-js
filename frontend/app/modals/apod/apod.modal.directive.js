'use strict';

import angular from 'angular';

function apodModal() {
  return {
    restrict: 'E',
    bindToController: {
      apodModalShown: '=',
      apodModalFocus: '=',
      apodLastFocus: '=',
      device: '='
    },
    scope: {},
    transclude: true,
    template: require('./apod.modal.html'),
    controller: apodModalController,
    controllerAs: 'vm',
  }
}

apodModalController.$inject = ['$rootScope'];

function apodModalController($rootScope) {
  var vm = this;

  vm.hideApodModal = hideApodModal;
  vm.escape = escape;

  function hideApodModal() {

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
    vm.apodModalShown = false;
    vm.apodModalFocus = false;
    vm.apodLastFocus.focus();
  }

  function escape(event) {
    if (event.which === 27) {
      vm.hideApodModal();
    }
  }
}

export default angular.module('apodModal', [
  ])
  .directive('apodModal', apodModal)
  .name;
