'use strict';

import angular from 'angular';

GlobalService.$inject = [];

function GlobalService() {

  return {
      modalOpen: () => {
        modalOpen = !modalOpen;
        return modalOpen;
      },
      mobileLogoIndex: () => {
        var mobileIndices = {
          mobileLogoTabIndex: 0,
          tabletLogoTabIndex: -1,
          desktopLogoTabIndex: -1
        }
        return mobileIndices;
      },
      tabletLogoIndex: () => {
        var tabletIndices = {
          mobileLogoTabIndex: -1,
          tabletLogoTabIndex: 0,
          desktopLogoTabIndex: -1
        }
        return tabletIndices;
      },
      desktopLogoIndex: () => {
        var desktopIndices = {
          mobileLogoTabIndex: -1,
          tabletLogoTabIndex: -1,
          desktopLogoTabIndex: 0
        }
        return desktopIndices;
      },
      modalOpenLogoIndex: () => {
        var modalOpenIndices = {
          mobileLogoTabIndex: -1,
          tabletLogoTabIndex: -1,
          desktopLogoTabIndex: -1
        }
        return modalOpenIndices;
      }
  }
}

export default angular.module('homepage.GlobalService', [
    ])
    .service('GlobalService', GlobalService)
    .name;
