(function () {

    'use strict';

    angular.module('RealityWall').config(HomeRouteConfig);

    HomeRouteConfig.$inject = ['$stateProvider'];

    function HomeRouteConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'js/components/home/home.html',
                controller: 'HomeController',
                controllerAs: 'hc'
            });
    }

})();