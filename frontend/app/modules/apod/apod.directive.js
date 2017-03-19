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

apodController.$inject = ['$http', 'ApiService'];

function apodController($http, ApiService) {
  var vm = this;

  vm.title = "Astronomy Picture of the Day";

  vm.toggleModal = toggleModal;
  vm.modalShown = false;

  function toggleModal() {
    vm.modalShown = !vm.modalShown;
  }

  ApiService.apod().then(function(response) {
    vm.apod = response.data;
    console.log(vm.apod);
  });

}

export default angular.module('apod', [
  ])
  .directive('apod', apod)
  .name;
