//Service style, probably the simplest one
myApp.service('categoryService', ['$http', '$q', function ($http, $q) {
    var serviceBase = '/api/categorydetail';

    this.getAllCategies = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + "/GetAllCategoryDetails").success(function (data, status, headers, config) {

            var results = [];

            results.data = data;
            results.headers = headers();
            results.status = status;
            results.config = config;

            deferred.resolve(results);
        }).error(deferred.reject);

        return deferred.promise;
    };
}]);