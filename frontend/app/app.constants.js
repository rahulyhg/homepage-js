import angular from 'angular';

function AppConstants() {
  return {
    basePathIp: 'http://192.168.0.30',
    basePathHost: 'http://homepage.app',
  }
}

export default angular.module('homepage.AppConstants', [])
  .service('AppConstants', AppConstants)
  .name;
