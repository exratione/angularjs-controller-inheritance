/*global
  angular: false
*/

(function () {
  'use strict';
  var inheritance = angular.module('inheritance');

  function InheritByInjectorController($injector, $scope) {
    // Override a parent controller function. We have to do this before calling
    // $injector.invoke(). But leave it open to further overriding by child
    // classes.
    this.setControllerName = this.setControllerName || function () {
      $scope.controllerName = 'inheritByInjectorController';
    };

    // Using the injector like this is not the same as prototypical inheritance.
    // No prototype functions are brought over, only what is attached to (this)
    // in the parent controller constructor.
    $injector.invoke(inheritance.BaseNoPrototypeFunctionalityControllerConstructor, this, {
      $scope: $scope
    });
  }

  inheritance.InheritByInjectorControllerConstructor = InheritByInjectorController;
  inheritance.controller('inheritByInjectorController', [
    '$injector',
    '$scope',
    InheritByInjectorController
  ]);

})();
