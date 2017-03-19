'use strict';

import angular from 'angular';
// import uiRouter from 'angular-ui-router';

import apod from './apod.directive.js';

export default angular.module('homepage.apod', [
  apod
])
// .config("hi")
.run(function($templateCache) {
  $templateCache.put('./apod-template.html', 'Picture of the day template')
})
.name;
