angular.module('RealityWall').controller('SeoController', ['SeoFactory', 'Dispatcher', '$scope',
function (SeoFactory, Dispatcher, $scope) {

    var self = this;

    self.title = SeoFactory.getTitle();
    self.description = SeoFactory.getDescription();


    self.titleUpdateId = Dispatcher.addListener('title:update', function (title) {
        self.title = title;
    });
    self.descriptionUpdateId = Dispatcher.addListener('description:update', function (description) {
        self.description = description;
    });

    $scope.$on('$destroy', function () {
        Dispatcher.removeListener(self.titleUpdateId);
        Dispatcher.removeListener(self.descriptionUpdateId);
    });

}]);