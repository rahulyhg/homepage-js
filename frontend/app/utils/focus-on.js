'use strict';

import angular from 'angular';

focusOn.$inject = ['$timeout', '$parse'];

function focusOn($timeout, $parse) {
  return {
    link: function (scope, element, attrs) {
      var model = $parse(attrs.focusOn);
      scope.$watch(model, function (val) {
        if (val === true) {
          $timeout(function () {
            element[0].focus();
          }, 700);
        }
      });
    }
  };
};

export default angular.module('focusOn', [
  ])
  .directive('focusOn', focusOn)
  .name;
