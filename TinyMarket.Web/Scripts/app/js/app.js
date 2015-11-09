'use strict'; 

var myApp = angular.module( 'myApp' , [ 
    'ngRoute',
    'ui.bootstrap',
    'sx.wizard',
    'isteven-multi-select',
    'ngDroplet'
]);
myApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when( '/main' , {
        templateUrl: 'views/main.htm', 
        controller: 'demoMinimum'
    });

    $routeProvider.when( '/getting-started' , {
        templateUrl: 'views/getting-started.htm'
    });

    $routeProvider.when( '/configs-options' , {
        templateUrl: 'views/configs-options.htm', 
    });        

    $routeProvider.when( '/new-post' , {
        controller: 'newPost'
    });        

    $routeProvider.when( '/demo-horizontal-layout' , {
        templateUrl: 'views/demo-horizontal-layout.htm', 
        controller: 'demoHorizontalLayout'
    });        

    $routeProvider.when( '/demo-dynamic-update' , {
        templateUrl: 'views/demo-dynamic-update.htm', 
        controller: 'demoDynamicUpdate'
    });        

    $routeProvider.when( '/demo-disabling-enabling' , {
        templateUrl: 'views/demo-disabling-enabling.htm', 
        controller: 'demoDisablingEnabling'
    });        

    $routeProvider.when( '/demo-grouping' , {
        templateUrl: 'views/demo-grouping.htm', 
        controller: 'demoGrouping'
    });
    $routeProvider.when('/demo-custom', {
        templateUrl: 'views/demo-custom.htm',
        controller: 'demoCustom'
    });

    $routeProvider.when( '/demo-output-properties' , {
        templateUrl: 'views/demo-output-properties.htm', 
        controller: 'demoMinimum'
    });        

    $routeProvider.when( '/demo-helper-elements' , {
        templateUrl: 'views/demo-helper-elements.htm', 
        controller: 'demoMinimum'
    });            

    $routeProvider.when( '/demo-callbacks' , {
        templateUrl: 'views/demo-callbacks.htm', 
        controller: 'demoCallbacks'
    });        

    $routeProvider.when( '/demo-single-selection-mode' , {
        templateUrl: 'views/demo-single-selection-mode.htm', 
        controller: 'demoSingleSelectionMode'
    });            

    $routeProvider.when( '/dependency-compatibility' , {
        templateUrl: 'views/dependency-compatibility.htm'
    });

    $routeProvider.when( '/issues-bug-reporting' , {
        templateUrl: 'views/issues-bug-reporting.htm'
    });

    $routeProvider.when( '/contributing' , {
        templateUrl: 'views/contributing.htm'
    });
    

    $routeProvider.when( '/breaking-changes' , {
        templateUrl: 'views/breaking-changes.htm'
    });    
    
    $routeProvider.when( '/faq' , {
        templateUrl: 'views/faq.htm'
    });
    
    $routeProvider.when( '/mit-license' , {
        templateUrl: 'views/mit-license.htm'
    });

    $routeProvider.when( '/other-cool-stuffs' , {
        templateUrl: 'views/other-cool-stuffs.htm'
    });
    

    $routeProvider.otherwise( {
        redirectTo: '/main'
    });

}]);

myApp.controller('appController', ['$scope', '$wizard', function ($scope, $wizard) {
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
                    $scope.confirmForm.$setPristine();
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

