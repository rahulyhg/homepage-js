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

apodModalController.$inject = ['$scope', 'GlobalService'];

function apodModalController($scope, GlobalService) {
  var vm = this;

  vm.hideApodModal = hideApodModal;
  vm.escape = escape;

  function hideApodModal() {

    if ($scope.$parent.$parent.device === 'mobile') {
      $scope.$parent.$parent.logoIndices = GlobalService.mobileLogoIndex();
    }

    if ($scope.$parent.$parent.device === 'tablet') {
      $scope.$parent.$parent.logoIndices = GlobalService.tabletLogoIndex();
    }

    if ($scope.$parent.$parent.device === 'desktop') {
      $scope.$parent.$parent.logoIndices = GlobalService.desktopLogoIndex();
    }

    $scope.$parent.$parent.modalOpen = false;
    $scope.$parent.$parent.tabIndex = 0;
    $scope.$parent.$parent.modalTabIndex = -1;

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
