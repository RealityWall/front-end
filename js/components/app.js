/**
 * Module Declaration
 */
angular.module('RealityWall', ['ui.router']);


/**
 * Default Routing
 */
angular.module('RealityWall').config([ '$urlRouterProvider',
function ($urlRouterProvider) { $urlRouterProvider.otherwise("/"); }]);