/*global
  angular: false
*/

(function () {
  'use strict';

  // Create the example application AngularJS module.
  var inheritance = angular.module('inheritance', []);

  // Use the config function to set up routes.
  inheritance.config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/partial/home.html'
      })
      .when('/inheritByInjector', {
        controller: 'inheritByInjectorController',
        templateUrl: '/partial/generic.html'
      })
      .when('/inheritPrototypically', {
        controller: 'inheritPrototypicallyController',
        templateUrl: '/partial/generic.html'
      })
      .when('/mixinByInjector', {
        controller: 'mixinByInjectorController',
        templateUrl: '/partial/generic.html'
      })
      .when('/mixinWithPrototypicalInheritance', {
        controller: 'mixinWithPrototypicalInheritanceController',
        templateUrl: '/partial/generic.html'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });

  // Add a prototypical inheritance function. Note that this will need es5-sham
  // in older browsers to provide Object.create().
  inheritance.inherits = function (ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false
      }
    });
  };

})();
