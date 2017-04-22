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

apodController.$inject = ['ApiService'];

function apodController(ApiService) {
  var vm = this;

  vm.title = 'Astronomy Picture of the Day';

  vm.toggleApodModal = toggleApodModal;
  vm.spaceEnter = spaceEnter;
  vm.apodModalShown = false;
  vm.apodModalFocus = false;
  vm.apodLastFocus = {};

  function toggleApodModal() {
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
