'use strict';

import angular from 'angular';

function weather() {
  return {
    restrict: 'E',
    bindToController: {},
    scope: {},
    template: require('./weather-template.html'),
    controller: weatherController,
    controllerAs: 'vm'
  }
}

weatherController.$inject = ['$cookies', 'ApiService', '$http', 'AppConstants', '$scope'];

function weatherController($cookies, ApiService, $http, AppConstants, $scope) {
  var vm = this;

  vm.showInput = true;
  vm.showWeather = false;
  vm.tempF = true;
  vm.enterZipCode = enterZipCode;
  vm.tempChange = tempChange;
  vm.resetZip = resetZip;
  vm.initialPageLoad = true;
  vm.spaceEnter = spaceEnter;
  vm.spaceEnterReset = spaceEnterReset;
  vm.tabIndex = 0;

  vm.cachedZipCode = $cookies.get('zipCode');

  $http.get(`${AppConstants.basePath}/static/zip-codes.json`).then(function(response) {
  // $http.get(`${AppConstants.basePath}/content/static/zip-codes.json`).then(function(response) {
    vm.zipCodesJson = response.data;
  }).catch(function(e) {
    console.log("Error: " + e);
  });

  if ((angular.equals({}, vm.zipCodesJson) )) {
    return
  }

  if (vm.cachedZipCode) {
    vm.showInput = false;
    vm.showWeather = true;

    ApiService.weather(vm.cachedZipCode).then(function(response) {
      vm.weather = response.data;
    });
  }

  function enterZipCode(infoForm) {
    if (vm.userZipCode < 10000) {
      vm.userZipCodeString = ("00000" + vm.userZipCode).slice(-5);
    }

    if (!vm.userZipCodeString) {
      vm.userZipCodeString = vm.userZipCode.toString();
    }

    if (vm.zipCodesJson.indexOf(vm.userZipCodeString) > 0) {
      $cookies.put('zipCode', vm.userZipCodeString);
      vm.cachedZipCode = vm.userZipCode;
      vm.showInput = false;
      vm.showWeather = true;
      vm.resetZipTrue = false;
      vm.initialPageLoad = false;

      ApiService.weather(vm.userZipCodeString).then(function(response) {
        vm.weather = response.data;
      });
    }

    if (vm.zipCodesJson.indexOf(vm.userZipCodeString) == -1) {
      vm.userZipCodeString = false;
      vm.zipValue = infoForm.zip.$modelValue;
      vm.zipError = true;
    }
  }

  function spaceEnter(event) {
    if (event.which === 13 || event.which === 32) {
      tempChange();
    }
  }

  function spaceEnterReset(event) {
    if (event.which === 13 || event.which === 32) {
      resetZip();
    }
  }

  function tempChange() {
    vm.tempF = !vm.tempF;
    vm.tempChanged = true;
  }

  function resetZip() {
    vm.showWeather = !vm.showWeather;
    vm.showInput = !vm.showInput;
    vm.initialPageLoad = false;
    vm.resetZipTrue = true;
    delete vm.userZipCodeString;
    $cookies.remove('zipCode');
  }
}

export default angular.module('weather', [
  ])
  .directive('weather', weather)
  .name;
