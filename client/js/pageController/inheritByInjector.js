/*global
  angular: false
*/

(function () {
  'use strict';

  var inheritance = angular.module('inheritance');

  function InheritByInjectorController($injector, $scope) {
    // Using the injector like this is not the same as prototypical inheritance.
    // The prototype functions are not brought over, only what is attached to
    // (this) in the parent controller constructor.
    $injector.invoke(inheritance.BaseNoPrototypeFunctionalityControllerConstructor, this, {
      $scope: $scope
    });

    // Override a parent controller function.
    this.setControllerName = function () {
      $scope.controllerName = 'inheritByInjectorController';
    };

    this.initialize();
  }

  inheritance.controller('inheritByInjectorController', [
    '$injector',
    '$scope',
    InheritByInjectorController
  ]);

})();
