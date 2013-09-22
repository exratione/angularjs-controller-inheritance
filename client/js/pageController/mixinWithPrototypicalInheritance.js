/*global
  angular: false
*/
/**
 * @fileOverview
 * A child controller that inherits from multiple parents via prototypical
 * inheritance for the main parent and then the addition of a mixin.
 */

(function () {
  'use strict';
  var inheritance = angular.module('inheritance');

  /**
   * A child controller that inherits from multiple parents via prototypical
   * inheritance for the main parent and then the addition of a mixin.
   */
  function MixinWithPrototypicalInheritanceController($scope) {
    // We can avoid passing long argument lists explicitly by suitably ordering
    // the injected dependencies. This is pleasant when the number of services
    // starts growing.
    MixinWithPrototypicalInheritanceController.super_.apply(this, arguments);
    // Also run the mixin constructor. Here it's only a coincidence that the
    // signatures match. You are most likely to have to explicitly declare the
    // dependences in the method signature.
    inheritance.BaseMixinControllerConstructor.call(this, $scope);
  }
  // See /js/app.js for the definition of inheritance.inherits().
  inheritance.inherits(MixinWithPrototypicalInheritanceController, inheritance.InheritPrototypicallyControllerConstructor);
  var p = MixinWithPrototypicalInheritanceController.prototype;

  // Add the mixin prototype functionality to the ChildController prototype,
  // provided it doesn't already exist - i.e. is overridden.
  angular.forEach(inheritance.BaseMixinControllerConstructor.prototype, function (value, name) {
    if (p[name] === undefined) {
      p[name] = value;
    }
  });


  /**
   * Override a parent method.
   *
   * @see BasePrototypeFunctionality#setControllerName
   */
  p.setControllerName = function () {
    this.$scope.controllerName = 'mixinWithPrototypicalInheritanceController';
  };

  /**
   * Override a parent method.
   */
  p.initialize = function () {
    var self = this;
    // Call the parent class function.
    MixinWithPrototypicalInheritanceController.super_.prototype.initialize.apply(this, arguments);
    // Then decorate the scope with this detector function for the mixin
    // prototype methods.
    this.$scope.mixinPrototypeFunctionsInherited = function () {
      return (typeof self.mixinPrototypeFunction === 'function');
    };
  };

  /**
   * Detector for whether or not prototype functions from the mixing turned up.
   *
   * @return {boolean}
   *   Return true if the prototype is decorated with mixin controller
   *   methods.
   */
  p.mixinPrototypeFunctionsInherited = function () {
    return (typeof this.mixinPrototypeFunction === 'function');
  };

  inheritance.MixinWithPrototypicalInheritanceControllerConstructor = MixinWithPrototypicalInheritanceController;
  inheritance.controller('mixinWithPrototypicalInheritanceController', [
    '$scope',
    MixinWithPrototypicalInheritanceController
  ]);

})();
