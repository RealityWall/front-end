/**
 * Module Declaration
 */
angular.module('RealityWall', ['ui.router']);


/**
 * Default Routing
 */
angular.module('RealityWall').config(Config);

Config.$inject = ['$urlRouterProvider', '$stateProvider'];

function Config ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'js/components/app/app.html'
        });
}