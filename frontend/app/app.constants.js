import angular from 'angular';

function AppConstants() {
  return {
    baseApiPath: location.protocol + '//' + location.hostname,
    basePath: location.protocol + '//' + location.host,
  }
}

export default angular.module('homepage.AppConstants', [])
  .service('AppConstants', AppConstants)
  .name;
