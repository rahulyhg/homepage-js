'use strict';

import angular from 'angular';

function apodModal() {
  return {
    restrict: 'E',
    bindToController: {
      apodModalShown: '=',
      apodModalFocus: '=',
      apodLastFocus: '='
    },
    scope: {},
    transclude: true,
    template: require('./apod.modal.html'),
    controller: apodModalController,
    controllerAs: 'vm',
  }
}

apodModalController.$inject = ['$scope'];

function apodModalController($scope) {
  var vm = this;

  vm.hideApodModal = hideApodModal;
  vm.escape = escape;

  function hideApodModal() {
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
