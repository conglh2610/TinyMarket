myApp.controller('newPost', ['$scope', 'serviceCommon', 'regionService', 'categoryService', '$interval', '$wizard', function ($scope, serviceCommon, regionService, categoryService, $interval, $wizard) {

    $scope.data = {};
    regionService.getAllRegions().then(function (results) {
        $scope.data.regionDataSource = results.data;
    });


    categoryService.getAllCategories().then(function (results) {
        $scope.data.categoryDataSource = categoryAddAndDisableParent(results.data);
    });

     var categoryAddAndDisableParent = function (categoryData) {
        var result = [];
        var categoryId = 0;
        for (var i = 0; i < categoryData.length; i++) {
            if (categoryId != categoryData[i].CategoryId) {
                var newParent = { Id: 0, Name: '--'+categoryData[i].Category.Name + '--', IsDisabled: true }
                result.push(newParent);
                categoryId = categoryData[i].CategoryId;
            }

            else {
                var newChild = { Id: categoryData[i].Id, Name: categoryData[i].Name, IsDisabled: false }
                result.push(newChild);
            }
        }

        return result;
    }


    $scope.config = {
        size: 'lg',
        title: 'Tạo thông tin rao vặt',
        shadow: true,
        passthrough: false
    };

    var wizard = $wizard
        .$new({
            title: $scope.config.title,
            size: $scope.config.size,
            shadow: $scope.config.shadow,
            successing: function ($data, $step, $isLastStep, callback) {
                alert(window.angular.toJson($data, true));
                return callback(true);
            }
        })
        .addStep({
            index: 1,
            id: 'step-1-welcome',
            title: 'Tạo tin',
            templateUrl: 'views/step-01-information.html',
            controller: function ($scope, $timeout) {
                //$scope.$context.behavior.entering = function (options, callback) {
                //    $scope.basicInfoForm.$setPristine();
                //    if (options.entered) {
                //        debugger;
                //    } else {
                //        debugger;
                //    }
                //};
                $scope.$context.behavior.leaving = function (options, callback) {
                    if (options.forward) {
                        $timeout(function () {
                            $scope.informationForm.$setSubmitted();
                            return callback($scope.informationForm.$valid);
                        }, 2000);
                    } else {
                        return callback(true);
                    }
                };
            }
        })
        .addStep({
            index: 2,
            id: 'step-2-update-data',
            title: 'Xác nhận',
            templateUrl: 'views/step-02-confirm.html',
            controller: function ($scope, $timeout) {
                $scope.$context.behavior.entering = function (options, callback) {
                    $scope.basicInfoForm.$setPristine();
                    if (options.entered) {
                        return callback();
                    } else {
                        $timeout(function () {
                            $scope.genders = ['Male', 'Female'];
                            $scope.countries = ['China', 'US', 'UK'];
                            return callback();
                        }, 2000);
                    }
                };
                $scope.$context.behavior.leaving = function (options, callback) {
                    if (options.forward) {
                        $timeout(function () {
                            $scope.basicInfoForm.$setSubmitted();
                            return callback($scope.basicInfoForm.$valid);
                        }, 2000);
                    } else {
                        return callback(true);
                    }
                };
            }
        })
        .addStep({
            index: 3,
            id: 'step-5-customize-navigation',
            title: 'Hoàn tất',
            templateUrl: 'views/step-05-custmize-nav.html',
            controller: 'wizardStepCustmizeNavCtrl'
        });
    $scope.launch = function () {
        wizard.open(
            $scope.data,
            function (result) {
                $scope.result = result;
            },
            window.angular.noop);
    };
}]);
