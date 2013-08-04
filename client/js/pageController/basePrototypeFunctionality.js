/*global
  angular: false
*/
/**
 * @fileOverview
 * An "abstract" base controller function that defines functionality in
 * its prototype rather than in the function body.
 */

(function () {
  'use strict';
  var inheritance = angular.module('inheritance');

  /**
   * An "abstract" base controller function that defines functionality in
   * its prototype rather than in the function body.
   */
  function BasePrototypeFunctionalityController($scope) {
    this.$scope = $scope;
    this.initialize();
  }
  var p = BasePrototypeFunctionalityController.prototype;

  /**
   * Set the controller name in the scope.
   */
  p.setControllerName = function () {
    this.$scope.controllerName = 'basePrototypeFunctionalityController';
  };

  /**
   * Initialize the controller. Called on instantiation.
   */
  p.initialize = function () {
    this.setControllerName();
  };

  inheritance.BasePrototypeFunctionalityControllerConstructor = BasePrototypeFunctionalityController;
})();
