/*global
  angular: false
*/
/**
 * @fileOverview
 * An "abstract" base controller function that does define functionality in
 * its prototype.
 */

(function () {
  'use strict';

  function BasePrototypeFunctionalityController($scope) {
    this.$scope = $scope;
  }
  var p = BasePrototypeFunctionalityController.prototype;

  p.setControllerName = function () {
    this.$scope.controllerName = 'basePrototypeFunctionalityController';
  };

  p.initialize = function () {
    this.setControllerName();
  };

  var inheritance = angular.module('inheritance');
  inheritance.BasePrototypeFunctionalityControllerConstructor = BasePrototypeFunctionalityController;

})();
