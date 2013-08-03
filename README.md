AngularJS Controller Inheritance
================================

This package contains some experiments with controller inheritance
in AngularJS.

How to Manage Similar Pages
---------------------------

So your application has a set of pages that are quite similar. They share
functionality of one form or another, which might differ somewhat between the
pages but is fairly similar in overall form.

There are a couple of approaches you might take in this situation:

  * Move the functionality into services.
  * Aggressively carve up the page into directives.
  * Create a hierarchy of controllers that inherit from one another.

All of these are valid approaches, and will be more or less useful in specific
circumstances, and can be used together or distinctly.

Here we're going to look at methods of creating controller hierarchies.
