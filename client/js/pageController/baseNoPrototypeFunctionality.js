/*global
  angular: false
*/
/**
 * @fileOverview
 * An "abstract" base controller function that doesn't define functionality in
 * its prototype, but rather in the function body.
 */

(function () {
  'use strict';
  var inheritance = angular.module('inheritance');

  /**
   * An "abstract" base controller function that doesn't define functionality in
   * its prototype, but rather in the function body.
   *
   * Note that function definitions must be set to allow child controllers to
   * override them by specifying the function in advance of invoking this
   * parent controller function. i.e.:
   *
   * this.fn = this.fn || function () {};
   */
  function BaseNoPrototypeFunctionalityController($scope) {
    /**
     * Set the controller name in the scope.
     */
    this.setControllerName = this.setControllerName || function () {
      $scope.controllerName = 'alphaController';
    };

    /**
     * Initialize the controller. Called on instantiation.
     */
    this.initialize = this.initialize || function () {
      this.setControllerName();
    };

    this.initialize();
  }

  inheritance.BaseNoPrototypeFunctionalityControllerConstructor = BaseNoPrototypeFunctionalityController;
})();
