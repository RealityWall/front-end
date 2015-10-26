(function () {
    'use strict';

    angular.module('RealityWall').directive('rwSearchSection', rwSearchSection);

    function rwSearchSection() {
        var directive = {
            controller: SearchSectionController,
            controllerAs: 'ssc',
            link: link,
            templateUrl: 'js/components/home/rwSeachSection/rwSearchSection.directive.html',
            restrict: 'EA'
        };
        return directive;

        function SearchSectionController() {
            var vm = this;

            vm.search = search;
            vm.searchQuery = '';
            vm.category = {};
            vm.showLoginModal = false;

            function search() {
                console.log('Search Query : ' + vm.searchQuery, 'Search Category : ' + vm.category.value);
            }
        }

        function link(scope, element, attrs) {
            element.css('height', window.innerHeight + 'px');
        }

    }

})();