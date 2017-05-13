'use strict';

import angular from 'angular';

imageLoad.$inject = [];

function imageLoad() {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          element.bind('load', function() {
            scope.$emit(attrs.imageLoad);
          });
          element.bind('error', function(){
              console.log('error');
          });
      }
  };
};

export default angular.module('imageLoad', [
  ])
  .directive('imageLoad', imageLoad)
  .name;
