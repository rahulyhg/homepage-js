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

weatherController.$inject = ['$cookies', 'ApiService', '$http', 'AppConstants'];

function weatherController($cookies, ApiService, $http, AppConstants) {
  var vm = this;

  vm.showInput = true;
  vm.showWeather = false;
  vm.enterZipCode = enterZipCode;

  vm.cachedZipCode = $cookies.get('zipCode');

  $http.get(`${AppConstants.basePathHost}:8080/app/modules/weather/zip-codes.json`).then(function(response) {
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
      console.log(vm.weather);

    });

  }

  function enterZipCode(infoForm) {

    if (vm.userZipCode < 10000) {
      vm.userZipCodeString = ("00000" + vm.userZipCode).slice(-5);
      // console.log(vm.userZipCodeString);
    }

    // console.log(typeof(vm.userZipCodeString));

    if (!vm.userZipCodeString) {
      vm.userZipCodeString = vm.userZipCode.toString();
      // console.log(vm.userZipCodeString);
    }

    // console.log(vm.zipCodesJson.indexOf(vm.userZipCodeString));

    if (vm.zipCodesJson.indexOf(vm.userZipCodeString) > 0) {

      $cookies.put('zipCode', vm.userZipCodeString);
      vm.cachedZipCode = vm.userZipCode;
      // console.log($cookies.get('zipCode'));
      vm.showInput = false;
      vm.showWeather = true;

      ApiService.weather(vm.userZipCodeString).then(function(response) {
        vm.weather = response.data;
        console.log(vm.weather);
      });
    }

    if (vm.zipCodesJson.indexOf(vm.userZipCodeString) == -1) {
      vm.userZipCodeString = false;
      vm.zipValue = infoForm.zip.$modelValue;
      vm.zipError = true;
    }

  }

}

export default angular.module('weather', [
  ])
  .directive('weather', weather)
  .name;
