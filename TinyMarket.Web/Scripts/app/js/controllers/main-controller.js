myApp.controller('mainController', ['$scope', 'postService', 'regionService', 'categoryService', '$timeout', function ($scope, postService, regionService, categoryService, $timeout) {

    $scope.fromDate = '';

    $scope.submit = function () {
        var dt = new Date($scope.fromDate);
        alert(dt);
    }
    $scope.moreCriteria = "Thêm điều kiện tìm kiếm";
    $scope.collapseExpand = function () {

        if (!$scope.isCollapsed) {
            $scope.isCollapsed = true;
            $("#linkCollapse").removeClass();
            $("#linkCollapse").addClass("glyphicon glyphicon-chevron-down");
            $scope.moreCriteria = "Thêm điều kiện tìm kiếm";
        }

        else {
            $scope.isCollapsed = false;
            $("#linkCollapse").removeClass();
            $("#linkCollapse").addClass("glyphicon glyphicon-chevron-up");
            $scope.moreCriteria = "Tìm kiếm cơ bản";
        }
    }
    $scope.isCollapsed = true;
    function makingDatasourceForDataSeach(data) {
        var result = [];
        var all = {
            name: '<strong>All Category</strong>',
            msGroup: true
        }

        var endGroup = {
            msGroup: false
        }

        result.push(all);
        var temp = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].CategoryId > 0 && temp != data[i].CategoryId) {
                if (i != 0) {
                    result.push(endGroup);
                }

                var parentCategory = {
                    name: '<strong>' + data[i].Category.Name + '</strong>',
                    msGroup: true
                }
                result.push(parentCategory);
            }
            var categoryChild = {
                icon: '<img  src="" />',
                id: data[i].CategoryId,
                name: data[i].Name,
                maker: '',
                ticked: false
            }
            result.push(categoryChild);
            temp = data[i].CategoryId;
        }
        result.push(endGroup);
        result.push(endGroup);
        return result;
    }

    var getAllRegions = function () {
        regionService.getAllRegions().then(function (results) {
            $scope.regionDataSource = results.data;
        });
    }
    getAllRegions();

    $scope.categoryDisplay = categoryService.getAllCategories().then(function (results) {
        var dataSource = makingDatasourceForDataSeach(results.data);
        $scope.categoryDisplay = dataSource;
    });

    $scope.posts = [];
    var searchPosts = function () {
        postService.searchPosts()
            .then(function (results) {
                $scope.posts = results.data;
            });
    };
    searchPosts();
}]);


var dateTimePicker = function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModelCtrl) {
            var parent = $(element).parent();
            var dtp = parent.datetimepicker({
                format: "LL",
                showTodayButton: true
            });
            dtp.on("dp.change", function (e) {
                ngModelCtrl.$setViewValue(moment(e.date).format("LL"));
                scope.$apply();
            });
        }
    };
};
myApp.directive('dateTimePicker', dateTimePicker);


