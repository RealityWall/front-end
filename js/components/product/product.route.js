(function () {

    'use strict';

    angular.module('RealityWall').config(ProductRouteConfig);

    ProductRouteConfig.$inject = ['$stateProvider'];

    function ProductRouteConfig($stateProvider) {
        $stateProvider
            .state('product', {
                url: '/product',
                templateUrl: 'js/components/product/product.html',
                controller: ['SeoFactory', '$scope', function (SeoFactory, $scope) {
                    SeoFactory.setTitle('RealityWall - Product');
                    SeoFactory.setDescription('Product');
                }]
            });
    }

})();