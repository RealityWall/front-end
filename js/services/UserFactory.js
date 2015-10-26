(function () {

    angular.module('RealityWall').factory('UserFactory', UserFactory);

    UserFactory.$inject = [];

    function UserFactory(Dispatcher) {

        var _data = {};
        var _isLogged = false;

        return {
            login: login,
            logout: logout,
            isLogged: function () { return _isLogged; },
            getUserData: function () { return _data; }
        };

        function login(mail, password) {
            _data.mail = mail;
            _data.password = password;
            _isLogged = true;
            Dispatcher.emit('user:isLogged', true);
        }

        function logout() {
            _data = {};
            _isLogged = false;
            Dispatcher.emit('user:isLogged', false);
        }

    }

})();