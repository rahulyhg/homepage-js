'use strict';

import angular from 'angular';

function searchBar() {
  return {
    restrict: 'E',
    bindToController: {},
    scope: {},
    template: require('./search-bar-template.html'),
    controller: searchController,
    controllerAs: 'vm'
  }
}

function searchController() {
  var vm = this;

  vm.message1 = "Google";
}

export default angular.module('searchBar', [
  ])
  .directive('searchBar', searchBar)
  .name;
