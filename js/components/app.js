/**
 * Module Declaration
 */
angular.module('RealityWall', ['ui.router']);


/**
 * Default Routing
 */
angular.module('RealityWall').config(Config);

Config.$inject = ['$urlRouterProvider'];

function Config ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
}