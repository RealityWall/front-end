(function () {

    'use strict';

    angular.module('RealityWall').controller('HomeController', HomeController);

    HomeController.$inject = ['SeoFactory'];

    function HomeController (SeoFactory) {

        var vm = this;
        SeoFactory.setTitle('RealityWall');
        SeoFactory.setDescription('Accueil');

        vm.showUserModal = true;
        vm.modalSelectedIndex = 0;
        vm.previousSelectedIndex = 0;
        vm.user = {};

        vm.openUserModal = openUserModal;
        vm.logIn = logIn;
        vm.signIn = signIn;
        vm.selectTab = selectTab;

        function selectTab(index) {
            vm.previousSelectedIndex = vm.modalSelectedIndex;
            vm.modalSelectedIndex = index;
        }

        function openUserModal (index) {
            vm.showUserModal = true;
            vm.modalSelectedIndex = index;
            vm.previousSelectedIndex = index;
        }

        function logIn () {
            console.log(vm.user);
        }

        function signIn () {
            console.log(vm.user);
        }
    }

})();