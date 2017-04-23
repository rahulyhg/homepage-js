'use strict';

import angular from 'angular';

appController.$inject = ['$http', '$rootScope'];

function appController($http, $rootScope) {
  $rootScope.tabIndex = 0;
  $rootScope.modalTabIndex = -1;
  $rootScope.modalOpen = false;
}

export default angular.module('homepage.appController', [
    ])
    .controller('appController', appController)
    .name;
