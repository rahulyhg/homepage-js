'use strict';

import angular from 'angular';

ApiService.$inject = ['$http', 'AppConstants'];

function ApiService($http, AppConstants) {
  return {
    apod: () => {
      return $http.get(`${AppConstants.baseApiPath}/api/v1/apod`);
    //   return $http.get(`${AppConstants.baseApiPath}/api/v1/apod?date=2017-08-13`);
    },
    epic: () => {
      return $http.get(`${AppConstants.baseApiPath}/api/v1/epic`);
    },
    weather: (zipCode) => {
      return $http.get(`${AppConstants.baseApiPath}/api/v1/weather?zip=${zipCode}`);
    }
  }
}

export default angular.module('homepage.ApiService', [
    ])
    .service('ApiService', ApiService)
    .name;
