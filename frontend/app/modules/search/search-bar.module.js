'use strict';

import angular from 'angular';

import searchBar from './search-bar.directive.js';

export default angular.module('homepage.searchBar', [
  searchBar
])
.name;
