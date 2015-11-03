(function () {

    'use strict';

    angular.module('RealityWall').config(WallRouteConfig);

    WallRouteConfig.$inject = ['$stateProvider'];

    function WallRouteConfig($stateProvider) {
        $stateProvider
            .state('wall', {
                url: '/wall/:wallId',
                templateUrl: 'js/components/wall/wall.html',
                controller: 'WallController',
                controllerAs: 'wc'
            });
    }

})();