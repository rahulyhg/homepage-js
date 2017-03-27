'use strict';

import angular from 'angular';

function epicModal() {
  return {
    restrict: 'E',
    bindToController: {
    },
    scope: {
      show: '='
    },
    transclude: true,
    template: require('./epic.modal.html'),
    controller: epicModalController,
    controllerAs: 'vm',
    link: function(scope) {
      scope.hideEpicModal = function() {
        scope.show = false;
      };
    }
  }
}

epicModalController.$inject = ['$scope'];

function epicModalController($scope) {
  var vm = this;

  vm.hideEpicModal = hideEpicModal;

  function hideEpicModal() {
    vm.epicModalShown = false;
  }
}

export default angular.module('epicModal', [
  ])
  .directive('epicModal', epicModal)
  .name;
