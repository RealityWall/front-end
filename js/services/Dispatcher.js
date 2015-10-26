(function () {

    angular.module('RealityWall').factory('Dispatcher', DispatcherFactory);

    function DispatcherFactory() {

        var _listeners = [];
        var _id = 0;

        return {
            addListener: addListener,
            emit: emit,
            removeListener: removeListener
        };

        function addListener (eventName, receive) {
            _id++;
            _listeners.push({
                id: _id,
                eventName: eventName,
                emit: receive
            });
            return _id;
        }

        function emit (eventName, data) {
            _listeners.forEach(function (listener) {
                if (listener.eventName == eventName) {
                    listener.emit(data);
                }
            })
        }

        function removeListener(id) {
            for (var i in _listeners) {
                if (_listeners[i].id == id) {
                    _listeners.splice(i, 1);
                    break;
                }
            }
        }

    }

})();