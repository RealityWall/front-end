(function () {
    'use strict';

    angular.module('RealityWall').directive('rwDropDown', rwSearchSection);

    rwSearchSection.$inject = ['$document'];

    function rwSearchSection($document) {
        var directive = {
            link: link,
            templateUrl: 'js/components/home/rwDropDown/rwDropDown.directive.html',
            restrict: 'EA',
            scope: {
                selected: '=category'
            }
        };
        return directive;

        function link(scope, element) {

            scope.hidden = true;
            scope.options = [{ faClass: 'fa-file-text-o', value: 'post', displayName: 'Post' }];
            scope.selected = { faClass: 'fa-globe', value: 'wall', displayName: 'Mur' };
            scope.toggleHidden = toggleHidden;
            scope.selectValue = selectValue;
            $document.on('click', clickHandler);

            // Fonction definitions

            function toggleHidden() {
                scope.hidden = !scope.hidden;
            }

            function selectValue(value) {
                scope.options.push(scope.selected);
                scope.selected = value;
                for (var i in scope.options) {
                    if (scope.options[i] === value) {
                        scope.options.splice(i, 1);
                        break;
                    }
                }
            }

            function clickHandler (e) {
                if (element !== e.target && !element[0].contains(e.target)) {
                    scope.$apply(function () {
                        scope.$eval(scope.hidden = true);
                    });
                }
            }
        }

    }

})();