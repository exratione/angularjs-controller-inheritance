AngularJS Controller Inheritance
================================

This package contains some experiments with controller inheritance in AngularJS,
and a trivial Node.js Express server to view the experiments as a web site.

How to Manage Similar Pages in AngularJS
----------------------------------------

So your application has a set of pages that are quite similar. They share
functionality of one form or another, which might differ a little between the
pages but is fairly similar in overall form.

There are a couple of approaches you might take in this situation to maximize
code reuse and clarity:

  * Move functionality into services, where it can be appropriately factored.
  * Aggressively carve up the pages into directives and aim for directive reuse.
  * Create an inheritance hierarchy of page controllers and place common functionality in ancestor controllers.

All of these are valid approaches, each more or less useful than the others in
some circumstances, and can be mixed and matched to suit.

Here we're going to look at methods of creating controller hierarchies.

Controller Inheritance via $injector
------------------------------------

An example:

    // Define a parent controller.
    function ParentController($scope) {
      // Only create functions if they haven't already been set by the child.
      this.decorateScope = this.decorateScope || function () {
        $scope.decorator = 23;
      }
      this.initialize = this.initialize || function () {
        this.decorateScope();
      }
    }
    // Use the $injector in the child controller.
    function ChildController($injector, $scope) {
      // Override the parent function while allowing children to override it.
      this.decorateScope = this.decorateScope || function () {
        $scope.decorator = 24;
      }
      $injector.invoke(ParentController, this, {
        $scope: $scope
      });
    }

Mixins work in the same way as inheritance:

    function ChildController($injector, $scope) {
      // Any number of other controllers can be invoked in this way.
      $injector.invoke(ParentController, this, {
        $scope: $scope
      });
      $injector.invoke(MixinController, this, {
        $scope: $scope
      });
    }

In summary:

  * All dependencies must be passed explicitly to $injector.invoke(), or else test code will break because injected mocks will be ignored by the parent class. The parent will load the non-mock instances for anything not explicitly set in $injector.invoke().
  * Unlike prototypical inheritance, parents must explicitly permit overriding.
  * A mixin works in exactly the same way as inheritance.
  * You can't define functionality in the controller constructor prototype. That is ignored by $injector.invoke(). You must define functions inside the constructor body, as shown above.

Controller Prototype Inheritance
--------------------------------

To enable standard-issue Javascript prototypical inheritance we should define an
inherits() function somewhere easily accessible:

    /**
     * A clone of the Node.js util.inherits() function. This will require
     * browser support for the ES5 Object.create() method.
     *
     * @param {Function} ctor
     *   The child constructor.
     * @param {Function} superCtor
     *   The parent constructor.
     */
    angular.inherits = function (ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false
        }
      });
    };

An example:

    // Define a parent controller.
    function ParentController($scope) {
      this.$scope = $scope;
      this.initialize();
    }
    /**
     * Decorate the scope.
     */
    ParentController.prototype.decorateScope = function () {
      this.$scope.decorator = 23;
    }
    /**
     * Initialize the controller for use.
     */
    ParentController.prototype.initialize = function () {
      this.decorateScope();
    }
    // Use standard prototypical inheritance for the child.
    function ChildController($scope) {
      // No need to explicitly pass the injected dependencies, provided they
      // are ordered consistently.
      ChildController.super_.apply(this, arguments);
    }
    angular.inherits(ChildController, ParentController);
    /**
     * Override the parent function.
     * @see ParentController#prototype
     */
    ChildController.prototype.decorateScope = function () {
      $scope.decorator = 24;
    }

Mixins can be created in a number of ways. For example, by calling the mixin
constructor and coping over its prototype functions.

    function ChildController($scope) {
      // Invoke the parent constructor.
      ChildController.super_.apply(this, arguments);
      // Invoke the mixin constructor. You don't get any of the mixin's
      // prototype methods by doing this, and are also less likely to be able to
      // structure arguments to as to be able to use apply(), so back to passing
      // dependencies explicitly.
      MixinController.call(this, $scope);
    }
    angular.inherits(ChildController, ParentController);
    // Add the mixin prototype functionality to the ChildController prototype.
    angular.extend(ChildController.prototype, MixinController.prototype);

  * This method cannot be mixed with the $injector method, as $injector.invoke() does not copy over prototype functionality from parent to child.
  * With suitable structuring of dependency parameter order there is no need to explicitly pass injected dependencies.
  * Mixins are somewhat graceless: call() the constructor function and clone prototype properties.
  * This method requires browser support for Object.create(), such as via es5-sham.js in older browsers.

Directive Controller Inheritance
--------------------------------

All of the notes above apply equally to inheritance of controllers associated
with directives rather than pages.
