myApp.controller('newPostConfirm', ['$scope', '$timeout', '$window', function ($scope, $timeout) {
    $scope.$context.behavior.entering = function (options, callback) {
        $scope.confirmForm.$setPristine();
        if (options.entered) {
            return callback();
        } else {
            $timeout(function () {
                angular.forEach($scope.$context.data.imageFiles, function (value, key) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(value.file);
                    fileReader.onload = function (e) {
                        $timeout(function () {
                            var imageData = e.target.result;
                            var element = '<img id="' + key + '" style="background-image: url(' + imageData + '); background-size: cover;" height="96" width="96"/>';
                            $("#imagesSection").append(element);
                        });
                    }
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

myApp.directive("passwordVerify", function () {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch('$context.data.password', function () {
                var combined;

                if ($scope.$context.data.passwordVerify || ctrl.$viewValue) {
                    combined = $scope.$context.data.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = $scope.$context.data.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});