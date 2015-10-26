(function () {
    'use strict';

    angular.module('RealityWall').directive('rwDialog', rwDialog);

    function rwDialog() {
        var directive = {
            restrict: 'E',
            scope: {
                show: '='
            },
            transclude: true,
            templateUrl: 'js/components/dialog/dialog.directive.html',
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width) scope.dialogStyle.width = attrs.width;
            if (attrs.height) scope.dialogStyle.height = attrs.height;
            scope.hideModal = function() { scope.show = false; };
        }
    }

})();