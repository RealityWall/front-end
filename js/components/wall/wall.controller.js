(function () {

    'use strict';

    angular.module('RealityWall').controller('WallController', WallController);

    WallController.$inject = ['$interval'];

    function WallController($interval) {

        var vm = this;

        vm.seconds = 9;

        $interval(function () {
            vm.seconds = (vm.seconds == 0 ) ? 59 : vm.seconds -1;
        }, 1000);
    }

})();