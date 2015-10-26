(function () {
    'use strict';

    angular.module('RealityWall').directive('rwUserModal', rwUserModal);

    function rwUserModal() {
        var directive = {
            templateUrl: 'js/components/home/rwUserModal/rwUserModal.directive.html',
            restrict: 'EA'
        };
        return directive;

    }

})();