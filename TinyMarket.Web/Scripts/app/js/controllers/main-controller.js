myApp.controller('mainController', ['$scope', 'postService', 'categoryService', '$timeout', function ($scope, postService, categoryService, $timeout) {

    $('.accordion').on('show hide', function (n) {
        $(n.target).siblings('.accordion-heading').find('.accordion-toggle i').toggleClass('icon-chevron-up icon-chevron-down');
    });
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

    //$scope.$watch(
    //              "categoryDisplay",
    //              function handleFooChange(newValue, oldValue) {
    //                  if ((newValue != undefined || oldValue != undefined) && newValue != oldValue) {
    //                      if (newValue != undefined)
    //                          alert("new value: " + newValue);
    //                      if (newValue != undefined)
    //                          alert("old value: " + newValue);
    //                  }
    //              }
    //          );

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



