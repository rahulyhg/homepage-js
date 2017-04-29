'use strict';

import angular from 'angular';

function epicModal() {
  return {
    restrict: 'E',
    bindToController: {
      epicModalShown: '=',
      epicModalFocus: '=',
      epicLastFocus: '='
    },
    scope: {},
    transclude: true,
    template: require('./epic.modal.html'),
    controller: epicModalController,
    controllerAs: 'vm',
  }
}

epicModalController.$inject = ['$scope', 'GlobalService'];

function epicModalController($scope, GlobalService) {
  var vm = this;

  vm.hideEpicModal = hideEpicModal;
  vm.escape = escape;

  function hideEpicModal() {

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
