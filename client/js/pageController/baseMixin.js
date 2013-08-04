/*global
  angular: false
*/
/**
 * @fileOverview
 * An "abstract" base controller function.
 */

(function () {
  'use strict';
  var inheritance = angular.module('inheritance');

  /**
   * An "abstract" base controller function to be used for mixin-style
   * inheritance.
   *
   * Note that prototype functions are not inherited if using the $injector
   * method of controller inheritance.
   */
  function BaseMixinController($scope) {
    $scope.mixinControllerNames = $scope.mixinControllerNames || [];
    $scope.mixinControllerNames.push('baseMixinController');
  }
  var p = BaseMixinController.prototype;

  /**
   * A placeholder function for tests of whether prototype functions are
   * preserved in inheritance.
   *
   * @return {boolean}
   */
  p.mixinPrototypeFunction = function () {
    return true;
  };

  inheritance.BaseMixinControllerConstructor = BaseMixinController;
})();
