myApp.controller('newPostConfirm', ['$scope', '$timeout', '$window', function ($scope, $timeout) {
    $scope.$context.behavior.entering = function (options, callback) {
        $scope.confirmForm.$setPristine();
        if (options.entered) {
            return callback();
        } else {
            $timeout(function () {
                angular.forEach($scope.$context.imageFiles, function(value, key) {
                    this.push(key + ': ' + value);
                    var element = '<img id="' + key + '" style="background-image: url(' + value + ')" alt="your image" />';
                    $("#imagesSection").append(element);
                    return callback();
                });
                return callback();
            }, 5);
        }
    };
    $scope.$context.behavior.leaving = function (options, callback) {
        if (options.forward) {
            $timeout(function () {
                $scope.confirmForm.$setSubmitted();
                return callback($scope.confirmForm.$valid);
            }, 5);
        } else {
            return callback(true);
        }
    };
}]);