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


  //
  // return {
  //     restrict: 'A',
  //     link: function(scope, element, attrs) {
  //         element.bind('load', function() {
  //             //call the function that was passed
  //             // alert('hi');
  //             scope.$apply(attrs.imageonload);
  //         });
  //     }
  // };

  //
  // return {
  //     restrict: 'A',
  //     link: function(scope, element, attrs) {
  //         element.bind('load', function() {
  //             alert('image is loaded');
  //         });
  //         element.bind('error', function(){
  //             alert('image could not be loaded');
  //         });
  //     }
  // };
