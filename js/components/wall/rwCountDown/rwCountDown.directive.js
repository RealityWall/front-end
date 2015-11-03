(function () {
    'use strict';

    angular.module('RealityWall').directive('rwCountDown', rwCountDown);

    rwCountDown.$inject = [];

    function rwCountDown() {
        var directive = {
            link: link,
            replace: true,
            templateUrl: 'js/components/wall/rwCountDown/rwCountDown.directive.html',
            restrict: 'EA',
            scope: {
                max: '=',
                remaining: '=',
                textColor: '=',
                borderColor: '='
            }
        };
        return directive;

        function link(scope, element) {

            if (!scope.textColor) scope.textColor = 'black';
            if (!scope.borderColor) scope.borderColor = 'black';

            var _drawArc = function (ctx, from, to, begin, max) {
                ctx.clearRect(0, 0, 105, 105);
                ctx.beginPath();
                ctx.strokeStyle = scope.borderColor;
                ctx.arc(45,50,50,from - Math.PI/2, (3 * Math.PI / 2) - to);
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.fillStyle= scope.textColor;
                ctx.font="30px Roboto";
                ctx.fillText('' + (max - begin) ,32,60);
            };

            var ctx = element[0].querySelector('#canvas').getContext('2d');

            var remaining = scope.remaining;
            var max = scope.max;

            scope.$watch('remaining', function (newValue) {
                remaining = newValue;
                _drawArc(ctx, 0 , (max - remaining) * 2 * Math.PI / max, (max - remaining), max);
            });

            _drawArc(ctx, 0 , (max - remaining) * 2 * Math.PI / max, (max - remaining), max);

        }



    }

})();