'use strict';

import angular from 'angular';

ApiService.$inject = ['$http'];

function ApiService($http) {
  return {
    version: () => {
      // return $http.get('http://homepage.app/api/');
      return $http.get(`http://192.168.0.30/api/`);
    },
    apod: () => {
      // return $http.get('http://homepage.app/api/v1/apod');
      return $http.get(`http://192.168.0.30/api/v1/apod`);
    },
    epic: () => {
      // return $http.get('http://homepage.app/api/v1/apod');
      return $http.get(`http://192.168.0.30/api/v1/epic`);
    },
    weather: (zipCode) => {
      // return $http.get('http://homepage.app/api/v1/apod');
      return $http.get(`http://192.168.0.30/api/v1/weather?zip=${zipCode}`);
    }
  }
}

export default angular.module('homepage.ApiService', [
    ])
    .service('ApiService', ApiService)
    .name;
