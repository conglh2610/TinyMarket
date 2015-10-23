
myApp.controller('newPost', ['$scope', 'serviceCommon', '$interval', '$wizard', function ($scope, serviceCommon, $interval, $wizard) {

    $scope.data = {
        username: 'shaun',
        email: 'jfarrio@gmail.com'
    };

    $scope.config = {
        size: 'lg',
        title: 'Wizard - by Shaun\'s Angular Toolkits',
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
            id: 'step-1-welcome',
            title: 'Welcome',
            templateUrl: 'views/step-01-welcome.html'
        })
        .addStep({
            id: 'step-2-update-data',
            title: 'Update data, entering and validating',
            templateUrl: 'views/step-02-update-data.html',
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
            id: 'step-3-config-next',
            title: 'Configure the "Next" button behavior',
            templateUrl: 'views/step-03-config-next.html',
            controller: function ($scope) {
                $scope.skipTemplateStep = false;

                $scope.$watch('skipTemplateStep', function (skipTemplateStep) {
                    $scope.$context.navigation.nextStepId = skipTemplateStep ? 'step-6-summary' : null;
                });
            }
        })
        .addStep({
            id: 'step-4-step-template',
            title: 'Specify step layout with inline HTML',
            template: '<p>Besides <code>templateUrl</code> you can specify step\'s layout by using inline HTML with <code>template</code>.</p>'
        })
        .addStep({
            id: 'step-5-customize-navigation',
            title: 'Customize navigation buttions',
            templateUrl: 'views/step-05-custmize-nav.html',
            controller: 'wizardStepCustmizeNavCtrl'
        })
        .addStep({
            id: 'step-6-summary',
            title: 'Summary',
            templateUrl: 'views/step-06-summary.html'
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
