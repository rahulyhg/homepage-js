'use strict';

import angular from 'angular';

import weather from './weather.directive.js';

export default angular.module('homepage.weather', [
  weather
])
.name;
