'use strict';

import angular from 'angular';

import apod from './apod.directive.js';

export default angular.module('homepage.apod', [
  apod
])
.name;
