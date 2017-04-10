'use strict';

import angular from 'angular';
// import AppConstants from '../app.constants.js';

ApiService.$inject = ['$http', 'AppConstants'];

function ApiService($http, AppConstants) {
  return {
    version: () => {
      // return $http.get('http://homepage.app/api/');
      return $http.get(`${AppConstants.basePathIp}`);
      // return $http.get(`http://192.168.0.30/api/`);
    },
    apod: () => {
      // return $http.get('http://homepage.app/api/v1/apod');
      return $http.get(`${AppConstants.basePathIp}/api/v1/apod`);
      // return $http.get(`http://192.168.0.30/api/v1/apod`);
    },
    epic: () => {
      // return $http.get('http://homepage.app/api/v1/apod');
      return $http.get(`${AppConstants.basePathIp}/api/v1/epic`);
      // return $http.get(`http://192.168.0.30/api/v1/epic`);
    },
    weather: (zipCode) => {
      // return $http.get('http://homepage.app/api/v1/apod');
      return $http.get(`${AppConstants.basePathIp}/api/v1/weather?zip=${zipCode}`);
      // return $http.get(`http://192.168.0.30/api/v1/weather?zip=${zipCode}`);
    }
  }
}

export default angular.module('homepage.ApiService', [
    ])
    .service('ApiService', ApiService)
    .name;
