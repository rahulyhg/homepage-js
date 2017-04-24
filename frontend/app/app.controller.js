'use strict';

import angular from 'angular';

appController.$inject = ['$scope', 'matchmedia', 'GlobalService'];

function appController($scope, matchmedia, GlobalService) {
  $scope.tabIndex = 0;
  $scope.modalTabIndex = -1;
  $scope.modalOpen = false;

  matchmedia.on('(max-width: 600px)', function(mediaQueryList){
    if (mediaQueryList.matches) {
      $scope.logoIndices = GlobalService.mobileLogoIndex();
      $scope.device = 'mobile';
    }
  })

  matchmedia.on('(min-width: 600px) and (max-width: 768px)', function(mediaQueryList){
    if (mediaQueryList.matches) {
      $scope.logoIndices = GlobalService.tabletLogoIndex();
      $scope.device = 'tablet';
    }
  })

  matchmedia.on('(min-width: 768px)', function(mediaQueryList){
    if (mediaQueryList.matches) {
      $scope.logoIndices = GlobalService.desktopLogoIndex();
      $scope.device = 'desktop';
    }
  })
}

export default angular.module('homepage.appController', [
    ])
    .controller('appController', appController)
    .name;
