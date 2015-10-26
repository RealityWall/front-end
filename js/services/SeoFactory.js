(function () {

    angular.module('RealityWall').factory('SeoFactory', SeoFactory);

    SeoFactory.$inject = ['Dispatcher'];

    function SeoFactory(Dispatcher) {

        var _title = 'RealityWall';
        var _description = 'Accueil';

        return {
            getTitle: function () { return _title; },
            getDescription: function () { return _description; },
            setTitle: function (title) {
                _title = title;
                Dispatcher.emit('title:update', title);
            },
            setDescription: function (description) {
                _description = description;
                Dispatcher.emit('description:update', description);
            }
        };

    }

})();