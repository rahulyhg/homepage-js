'use strict';

run.$inject = ['$rootScope', '$location', '$window'];

export default function run($rootScope, $location, $window) {
  $window.ga('create', 'UA-101171641-1', 'auto');
  $window.ga('send', 'pageview');

}
