'use strict';

import angular from 'angular';

function apodModal() {
  return {
    restrict: 'E',
    bindToController: {
    },
    scope: {
      show: '='
    },
    transclude: true,
    template: require('./apod.modal.html'),
    controller: apodModalController,
    controllerAs: 'vm',
    link: function(scope) {
      scope.hideModal = function() {
        scope.show = false;
      };
    }
  }
}

apodModalController.$inject = ['$scope'];

function apodModalController($scope) {
  var vm = this;

  vm.hideModal = hideModal;

  function hideModal() {
    vm.modalShown = false;
  }
}

export default angular.module('apodModal', [
  ])
  .directive('apodModal', apodModal)
  .name;
