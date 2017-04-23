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

epicModalController.$inject = ['$rootScope'];
// epicModalController.$inject = ['$scope'];

function epicModalController($rootScope) {
// function epicModalController($scope) {
  var vm = this;

  vm.hideEpicModal = hideEpicModal;
  vm.escape = escape;

  function hideEpicModal() {
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
