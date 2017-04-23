'use strict';

import angular from 'angular';

function apod() {
  return {
    restrict: 'E',
    bindToController: {},
    scope: {},
    template: require('./apod-template.html'),
    controller: apodController,
    controllerAs: 'vm',
  }
}

apodController.$inject = ['ApiService', '$rootScope'];

function apodController(ApiService, $rootScope) {
  var vm = this;

  vm.title = 'Astronomy Picture of the Day';

  vm.toggleApodModal = toggleApodModal;
  vm.spaceEnter = spaceEnter;
  vm.apodModalShown = false;
  vm.apodModalFocus = false;
  vm.apodLastFocus = {};

  function toggleApodModal() {

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

    vm.apodModalShown = !vm.apodModalShown;
    vm.apodModalFocus = !vm.apodModalFocus;
    vm.apodLastFocus = document.activeElement;
  }

  function spaceEnter(event) {
    if (event.which === 13 || event.which === 32) {
      vm.toggleApodModal();
    }
  }
  ApiService.apod().then(function(response) {
    vm.apod = response.data;

    if (vm.apod.vidUrl) {
      vm.title = 'Astronomy Video of the Day';
    }

  });

}

export default angular.module('apod', [
  ])
  .directive('apod', apod)
  .name;
