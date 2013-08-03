/*global
  angular: false
*/
/**
 * @fileOverview
 * An "abstract" base controller function that doesn't define functionality in
 * its prototype.
 */

(function () {
  'use strict';

  function BaseNoPrototypeFunctionalityController($scope) {
    this.setControllerName = function () {
      $scope.controllerName = 'alphaController';
    };

    this.initialize = function () {
      this.setControllerName();
    };
  }

  var inheritance = angular.module('inheritance');
  inheritance.BaseNoPrototypeFunctionalityControllerConstructor = BaseNoPrototypeFunctionalityController;

})();
