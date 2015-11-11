myApp.controller('newPostBasicInfo', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {
    $scope.$context.behavior.entering = function (options, callback) {
        if (options.entered) {
            return callback();
        } else {
            $timeout(function () {
                $scope.$context.data.radioModel = 'isSelling';
                return callback();
            }, 5);
        }
    };
    $scope.$context.behavior.leaving = function (options, callback) {
        if (options.forward) {
            $timeout(function () {
                $scope.$context.data.imageFiles = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);

                $scope.informationForm.$setSubmitted();
                return callback($scope.informationForm.$valid);
            }, 5);
        } else {
            return callback(true);
        }
    };
}]);