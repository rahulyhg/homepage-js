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

apodController.$inject = ['ApiService', 'GlobalService', '$scope', '$timeout'];

function apodController(ApiService, GlobalService, $scope, $timeout) {
  var vm = this;

  vm.title = 'Astronomy Picture of the Day';

  vm.inProgress = true;

  vm.toggleApodModal = toggleApodModal;
  vm.spaceEnter = spaceEnter;
  vm.apodModalShown = false;
  vm.apodModalFocus = false;
  vm.apodLastFocus = {};
  vm.apodError = false;

  vm.timer = $timeout(function() {
    vm.inProgress = false;
    vm.apodError = true;
  }, 5000);

  $scope.$on("apod", function() {
    $timeout(function() {
      $timeout.cancel(vm.timer);
      vm.inProgress = false;
    }, 100);
  });

  function toggleApodModal() {

    $scope.$parent.modalOpen = true;
    $scope.$parent.tabIndex = -1;
    $scope.$parent.modalTabIndex = 0;
    $scope.$parent.logoIndices = GlobalService.modalOpenLogoIndex();

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
