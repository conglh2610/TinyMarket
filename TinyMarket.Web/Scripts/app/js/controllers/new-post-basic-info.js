myApp.controller('newPostBasicInfo', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {
    $scope.$context.behavior.entering = function (options, callback) {
        if (options.entered) {
            return callback();
        } else {
            $scope.typesModel = 'isSelling';
            $timeout(function () {
                $scope.$watchCollection('typesModel', function () {
                    if ($scope.typesModel == "isBuying")
                        $scope.$context.data.model.IsBuying = true;
                    else
                        $scope.$context.data.model.IsBuying = false;
                });

                return callback();
            }, 5);
        }
    };
    $scope.$context.behavior.leaving = function (options, callback) {
        if (options.forward) {
            $timeout(function () {
                $scope.$context.data.imageFiles = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);
                if ($scope.$context.data.model.CategoryDetailModel.Id)
                {
                    $scope.$context.data.model.CategoryDetailId = $scope.$context.data.model.CategoryDetailModel.Id;
                }

                if ($scope.$context.data.model.RegionModel.Id) {
                    $scope.$context.data.model.RegionId = $scope.$context.data.model.RegionModel.Id;
                }
                $scope.informationForm.$setSubmitted();
                return callback($scope.informationForm.$valid);
            }, 5);
        } else {
            return callback(true);
        }
    };
}]);