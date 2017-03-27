'use strict';

import angular from 'angular';
// import uiRouter from 'angular-ui-router';

import epicModal from './epic.modal.directive.js';

export default angular.module('homepage.epicModal', [
  epicModal
])
.name;
