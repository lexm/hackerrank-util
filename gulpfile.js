'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var eslintRules = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {"impliedStrict": true}
  },
  "env": {
    "browser": true,
    "jquery": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "eqeqeq": ["error", "always"],
    "no-template-curly-in-string": "error",
    "no-console": "off",
    "no-undefined": "off",
    "indent": ["error", 2],
    "quotes": ["warn", "single", {"allowTemplateLiterals": true}],
    "no-multi-spaces": ["warn", {"exceptions": { "VariableDeclarator": true }}],
    "no-trailing-spaces": "warn",
    "new-cap": "warn",
    "no-redeclare": ["error", { "builtinGlobals": true }]
  }
};

var path = ['*.js', 'test/*.js'];

gulp.task('lint', function(){
  return gulp.src(path)
    .pipe(eslint(eslintRules))
    .pipe(eslint.format());
});

var testPath = ['test/*.js'];

gulp.task('mocha', function(){
  return gulp.src(testPath, {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function(){
  gulp.watch(path, ['lint', 'mocha']);
});

gulp.task('default', ['lint', 'mocha', 'watch']);
