'use strict';

import angular from 'angular';

focusModalClose.$inject = ['$timeout', '$parse'];

function focusModalClose($timeout, $parse) {
  return {
    link: function (scope, element, attrs) {
      var model = $parse(attrs.focusModalClose);
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

export default angular.module('focusModalClose', [
  ])
  .directive('focusModalClose', focusModalClose)
  .name;
