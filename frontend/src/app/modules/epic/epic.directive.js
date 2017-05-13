'use strict';

import angular from 'angular';

function epic() {
  return {
    restrict: 'E',
    bindToController: {},
    scope: {},
    template: require('./epic-template.html'),
    controller: epicController,
    controllerAs: 'vm',
  }
}

epicController.$inject = ['ApiService', 'GlobalService', '$scope', '$timeout'];

function epicController(ApiService, GlobalService, $scope, $timeout) {
  var vm = this;

  vm.type = {};
  vm.title = 'Recent EPIC Picture';

  vm.inProgress = true;

  vm.toggleEpicModal = toggleEpicModal;
  vm.spaceEnter = spaceEnter;
  vm.epicModalShown = false;
  vm.epicModalFocus = false;
  vm.epicLastFocus = {};
  vm.epicError = false;

  vm.timer = $timeout(function() {
    vm.inProgress = false;
    vm.epicError = true;
  }, 5000);

  $scope.$on("epic", function() {
    $timeout(function() {
      $timeout.cancel(vm.timer);
      vm.inProgress = false;
    }, 100);
  });

  function toggleEpicModal() {

    $scope.$parent.modalOpen = true;
    $scope.$parent.tabIndex = -1;
    $scope.$parent.modalTabIndex = 0;
    $scope.$parent.logoIndices = GlobalService.modalOpenLogoIndex();

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
