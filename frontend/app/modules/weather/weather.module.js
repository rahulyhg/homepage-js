'use strict';

import angular from 'angular';
// import uiRouter from 'angular-ui-router';

import weather from './weather.directive.js';

export default angular.module('homepage.weather', [
  weather
])
// .config("hi")
.name;
