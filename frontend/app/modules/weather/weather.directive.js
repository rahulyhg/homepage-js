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

weatherController.$inject = ['$cookies', 'ApiService', '$http'];

function weatherController($cookies, ApiService, $http) {
  var vm = this;

  vm.userInfo = {};
  vm.showInput = true;
  vm.showWeather = false;
  vm.enterZipCode = enterZipCode;
  vm.zipCodesList = {};

  vm.zipCode = $cookies.get('zipCode');
  // alert(vm.zipCode);

  if (vm.zipCode) {

    vm.showInput = false;
    vm.showWeather = true;

    ApiService.weather(vm.zipCode).then(function(response) {
      vm.weather = response.data;
      console.log(vm.weather);

    });

  }



  function enterZipCode(infoForm) {
    if (infoForm.$valid) {

      vm.zipCode = infoForm.zip.$modelValue;
      // $cookies.put('zipCode', vm.userInfo.zipCode);
      // console.log($cookies.get('zipCode'));
      vm.showInput = false;
      vm.showWeather = true;

      ApiService.weather(vm.zipCode).then(function(response) {
        vm.weather = response.data;
        console.log(vm.weather);
      });
    }
  }

// vm.zipCode ? vm.zipCode = vm.zipCode : vm.zipCode = vm.defaultZipCode;

  $http.get(`http://homepage.app:8080/app/modules/weather/zip-codes.json`).then(function(response) {
    vm.zipCodesList = response.data;
  });

  }

export default angular.module('weather', [
  ])
  .directive('weather', weather)
  .name;
