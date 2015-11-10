myApp.controller('newPostBasicInfo', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {
    $scope.$context.behavior.entering = function (options, callback) {
        if (options.entered) {
            return callback();
        } else {
            $timeout(function () {
               

                return callback();
            }, 5);
        }
    };
    $scope.$context.behavior.leaving = function (options, callback) {
        if (options.forward) {
            $timeout(function () {
                $scope.$context.imageFiles = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);

                $scope.informationForm.$setSubmitted();
                return callback($scope.informationForm.$valid);
            }, 5);
        } else {
            return callback(true);
        }
    };
}]);