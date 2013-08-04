/*global
  angular: false
*/
/**
 * @fileOverview
 * A child controller that inherits from multiple parents via the $injector
 * method.
 */

(function () {
  'use strict';
  var inheritance = angular.module('inheritance');

  /**
   * A child controller that inherits from multiple parents via the $injector
   * method.
   */
  function MixinByInjectorController($injector, $scope) {
    var self = this;
    // Override a parent controller function. We have to do this before calling
    // $injector.invoke(). But leave it open to further overriding by child
    // classes.
    this.setControllerName = this.setControllerName || function () {
      $scope.controllerName = 'mixinByInjectorController';
    };

    // Decorate the scope with this detector function.
    $scope.mixinPrototypeFunctionsInherited = function () {
      return (typeof self.mixinPrototypeFunction === 'function');
    };

    // Mixin multiple parent controllers.
    $injector.invoke(inheritance.BaseMixinControllerConstructor, this, {
      $scope: $scope
    });
    $injector.invoke(inheritance.InheritByInjectorControllerConstructor, this, {
      $injector: $injector,
      $scope: $scope
    });
  }

  inheritance.MixinByInjectorControllerConstructor = MixinByInjectorController;
  inheritance.controller('mixinByInjectorController', [
    '$injector',
    '$scope',
    MixinByInjectorController
  ]);

})();
