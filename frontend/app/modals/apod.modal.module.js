'use strict';

import angular from 'angular';
// import uiRouter from 'angular-ui-router';

import apodModal from './apod.modal.directive.js';

export default angular.module('homepage.apodModal', [
  apodModal
])
.name;
