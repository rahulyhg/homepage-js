'use strict';

import angular from 'angular';
// import uiRouter from 'angular-ui-router';

import searchBar from './search-bar.directive.js';

export default angular.module('homepage.searchBar', [
  searchBar
])
// .config("hi")
.name;
