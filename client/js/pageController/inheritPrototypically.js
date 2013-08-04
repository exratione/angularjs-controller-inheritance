/*global
  angular: false
*/

(function () {
  'use strict';
  var inheritance = angular.module('inheritance');

  function InheritPrototypicallyController($scope) {
    // We can avoid passing long argument lists explicitly by suitably ordering
    // the injected dependencies. This is pleasant when the number of services
    // starts growing.
    InheritPrototypicallyController.super_.apply(this, arguments);
  }
  inheritance.inherits(InheritPrototypicallyController, inheritance.BasePrototypeFunctionalityControllerConstructor);
  var p = InheritPrototypicallyController.prototype;

  /**
   * Override a parent method.
   *
   * @see BasePrototypeFunctionality#setControllerName
   */
  p.setControllerName = function () {
    this.$scope.controllerName = 'inheritPrototypicallyController';
  };

  inheritance.InheritPrototypicallyControllerConstructor = InheritPrototypicallyController;
  inheritance.controller('inheritPrototypicallyController', [
    '$scope',
    InheritPrototypicallyController
  ]);

})();
