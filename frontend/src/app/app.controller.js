'use strict';

import angular from 'angular';

appController.$inject = ['$scope', 'matchmedia', 'GlobalService', '$cookies', '$timeout'];

function appController($scope, matchmedia, GlobalService, $cookies, $timeout) {
  $scope.tabIndex = 0;
  $scope.modalTabIndex = -1;
  $scope.modalOpen = false;

  $scope.entryFade = false;
  $scope.entryShown = true;

  $timeout(function() {
    $scope.entryFade = true;
  }, 100);

  $scope.journeyOn = journeyOn;
  $scope.toggleEntryMessage = toggleEntryMessage;

  $scope.cachedHideEntry = $cookies.get('hideEntry');

  if ($scope.cachedHideEntry) {
    $scope.entryShown = false;
  }

  function journeyOn() {
    $scope.entryShown = false;
  }

  function toggleEntryMessage() {
    $cookies.put('hideEntry', true);
  }

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
