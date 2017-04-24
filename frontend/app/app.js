'use strict';

require('../index.html');

import angular from '../node_modules/angular';
import ngAnimate from '../node_modules/angular-animate';
import ngRoute from '../node_modules/angular-route';
import uiRouter from '../node_modules/angular-ui-router';
import ngAria from '../node_modules/angular-aria';
import ngCookies from '../node_modules/angular-cookies';
import ngMessages from '../node_modules/angular-messages';
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
import GlobalService from './services/global.service.js';

import focusOn from './utils/focus-on.js';

angular.module('homepage', [
    ngAnimate,
    ngRoute,
    uiRouter,
    ngAria,
    ngCookies,
    ngMessages,
    'matchmedia-ng',
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
    focusOn
])
  .config(configuration);
