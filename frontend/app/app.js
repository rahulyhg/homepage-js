'use strict';

import angular from '../node_modules/angular';
import ngAnimate from '../node_modules/angular-animate';
import ngRoute from '../node_modules/angular-route';
import uiRouter from '../node_modules/angular-ui-router';
import ngAria from '../node_modules/angular-aria';

import searchBar from './modules/search/search-bar.module.js';
import apod from './modules/apod/apod.module.js';
import epic from './modules/epic/epic.module.js';
import weather from './modules/weather/weather.module.js';

import apodModal from './modals/apod/apod.modal.module.js';
import epicModal from './modals/epic/epic.modal.module.js';

import ApiService from './services/api.service.js';

angular.module('homepage', [
    ngAnimate,
    ngRoute,
    uiRouter,
    ngAria,
    searchBar,
    apod,
    epic,
    weather,
    apodModal,
    epicModal,
    ApiService
])
  .controller('homepageController', homepageController)
  .config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    "self",
    "https://www.youtube.com/**",
    "https://img.youtube.com/**"
  ]);
});

function homepageController() {
}
