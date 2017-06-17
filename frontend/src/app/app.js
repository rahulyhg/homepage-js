'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
// import ngRoute from 'angular-route';
// import uiRouter from 'angular-ui-router';
// import ngGa from 'angular-google-analytics';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';
import 'matchmedia-ng';

import appController from './app.controller.js';

import searchBar from './modules/search/search-bar.module.js';
import apod from './modules/apod/apod.module.js';
import epic from './modules/epic/epic.module.js';
import weather from './modules/weather/weather.module.js';

import apodModal from './modals/apod/apod.modal.module.js';
import epicModal from './modals/epic/epic.modal.module.js';

import AppConstants from './app.constants.js';
import ApiService from './services/api.service.js';
import configuration from './app.config.js';
import run from './app.run.js';
import GlobalService from './services/global.service.js';

import focusOn from './utils/focus-on.js';
import imageLoad from './utils/image-load.js';

angular.module('homepage', [
    ngAnimate,
    // ngGa,
    // ngRoute,
    // uiRouter,
    ngAria,
    ngCookies,
    ngMessages,
    'matchmedia-ng',
    'angularLazyImg',
    appController,
    searchBar,
    apod,
    epic,
    weather,
    apodModal,
    epicModal,
    AppConstants,
    ApiService,
    GlobalService,
    focusOn,
    imageLoad
])
  // .config(configuration);
  .config(configuration)
  .run(run);
