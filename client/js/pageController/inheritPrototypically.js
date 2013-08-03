/*global
  angular: false
*/

(function () {
  'use strict';

  var inheritance = angular.module('inheritance');

  function InheritPrototypicallyController($scope) {
    inheritance.BasePrototypeFunctionalityControllerConstructor.call(this, $scope);
    this.initialize();
  }
  inheritance.inherits(InheritPrototypicallyController, inheritance.BasePrototypeFunctionalityControllerConstructor);
  var p = InheritPrototypicallyController.prototype;

  p.setControllerName = function () {
    this.$scope.controllerName = 'inheritPrototypicallyController';
  };

  inheritance.controller('inheritPrototypicallyController', [
    '$scope',
    InheritPrototypicallyController
  ]);

})();
