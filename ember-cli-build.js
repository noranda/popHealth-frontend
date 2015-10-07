/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  var funnel = require('broccoli-funnel');
  var gzip = require('broccoli-gzip');

  // bootstrap
  app.import(app.bowerDirectory + '/bootstrap-sass-official/assets/javascripts/bootstrap.js');

  // numeral.js
  app.import(app.bowerDirectory + '/numeral/numeral.js');

  // humps
  app.import(app.bowerDirectory + '/humps/humps.js');
  app.import('vendor/humps-shim.js', {
    exports: {
      'humps': ['default']
    }
  });

  var bootstrapFonts = funnel(app.bowerDirectory + '/bootstrap-sass-official/assets/fonts/bootstrap', {
    destDir: '/assets/bootstrap'
  });

  var fontAwesomeFonts = funnel(app.bowerDirectory + '/fontawesome/fonts', {
    destDir: '/assets/fontawesome'
  });

  var finalTree = app.toTree([bootstrapFonts, fontAwesomeFonts]);

  if (app.env === 'production') {
    finalTree = gzip(finalTree, {
      extensions: ['html', 'js', 'css', 'json', 'svg', 'txt', 'map'],
      keepUncompressed: true
    });
  }

  return finalTree;
};
