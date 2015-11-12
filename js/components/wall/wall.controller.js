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

        vm.posts = [
            { rank: 1, title: 'Vive la liberté iufhi uerhfiu efieu riuheriufeiueiufieu iuerierifue freoijfeiorfjoeirjfioe' +
            'efroiejfoieofijeoifje oferio eijorjfeo jeroif jeofj eofij eiufhe slujwh vliduhw fiuehfi u h !', author: 'Jean-Yves Delmotte' },
            { rank: 3, title: 'Bonjour la vie', author: 'Jean-Yves Delmotte' },
            { rank: 2, title: 'cc les gens', author: 'Antho Saraso6' },
            { rank: 4, title: 'cc les gens', author: 'Antho Saraso6' },
            { rank: 5, title: 'cc les gens', author: 'Antho Saraso6' },
            { rank: 6, title: 'cc les gens', author: 'Antho Saraso6' }
        ];
    }

})();