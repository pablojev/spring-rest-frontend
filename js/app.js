var app = angular.module('RESTApp', ['ngRoute']);
var url = 'http://localhost:8088/';

app.config(function($routeProvider) {
    var path = './views/';
    $routeProvider
        .when('/', {
            templateUrl: path + 'main.html'
        })
        .when('/add', {
            templateUrl: path + 'add.html',
            controller: 'addController'
        })
        .when('/edit/:id', {
            templateUrl: path + 'edit.html',
            controller: 'editController'
        })
        .when('/delete/:id', {
            templateUrl: path + 'delete.html',
            controller: 'deleteController'
        })
        .when('/show', {
            templateUrl: path + 'animals.html',
            controller: 'showController'
        })
        .when('/show/:id', {
            templateUrl: path + 'animal.html',
            controller: 'animalController'
        })
        .when('/species', {
            templateUrl: path + 'species.html',
            controller: 'speciesController'
        })
        .when('/specie/:id', {
            templateUrl: path + 'specie.html',
            controller: 'specieController'
        });
});

app.controller('addController', function($scope, $http) {
    
    $http({
        url: url + 'species/show',
        dataType: 'json'
    }).then(function(success) {
        $scope.species = success.data;
    }, function(error) {
        console.error(error);
    });
    
    $scope.add = function() {
        $http({
            url: url + 'animals/add',
            method: 'GET',
            dataType: 'json',
            params: {
                name: $scope.animalName,
                description: $scope.desc,
                image: $scope.image,
                specie: $scope.specie
            }
        }).then(function(success) {
            console.log(success);
            $scope.message = "Dodano poprawnie zwierzątko.";
        }, function(error) {
            console.error(error);
        });
    }
});

app.controller('showController', function($scope, $http) {
    $http({
        url: url + 'animals/show',
        dataType: 'json'
    }).then(function(success) {
        $scope.animals = success.data;
    }, function(error) {
        console.error(error);
    });
});

app.controller('animalController', function($scope, $http, $routeParams) {
    var id = $routeParams.id;
    $http({
        url: url + 'animals/show/' + id,
        dataType: 'json'
    }).then(function(success) {
        $scope.animal = success.data;
    }, function(error) {
        console.error(error);
    });
});

app.controller('speciesController', function($scope, $http) {
    
    $http({
        url: url + 'species/show'
    }).then(function(success) {
        $scope.species = success.data;
    }, function(error) {
        console.error(error);
    });
    
    
    $scope.add = function() {
        $http({
            url: url + 'species/add',
            dataType: 'json',
            params: {
                name: $scope.name,
                description: $scope.description
            }
        }).then(function(success) {
            if(success.data.id > 0) {
                $scope.species.push(success.data);
                $scope.message = "Gatunek dodano poprawnie."
            } else
                $scope.message = "Wystąpił błąd podczas dodawania gatunku.";
        }, function(error) {
            console.error(error);
        });
    }
});

app.controller('specieController', function($scope, $http, $routeParams) {
    var id = $routeParams.id;
    $http({
        url: url + 'species/show/' + id,
        dataType: 'json'
    }).then(function(success) {
        $scope.specie = success.data;
    }, function(error) {
        console.error(error);
    });
});

app.controller('deleteController', function($scope, $http, $routeParams) {
    var id = $routeParams.id;
    $http({
        url: url + 'animals/delete/' + id,
        dataType: 'json'
    }).then(function(succ) {
        $scope.message = "Usunięto poprawnie.";
    }, function(err) {
        console.error(err);
    });
});

app.controller('editController', function($scope, $http, $routeParams) {

    $http({
        url: url + 'species/show',
        dataType: 'json'
    }).then(function(success) {
        $scope.species = success.data;
    }, function(error) {
        console.error(error);
    });
    
    $http({
        url: url + 'animals/show/' + $routeParams.id,
        dataType: 'json'
    }).then(function(succ) {
        $scope.animal = succ.data;
    }, function(err) {
        console.error(err);
    });
    
    $scope.edit = function() {
        $http({
            url: url + 'animals/edit',
            dataType: 'json',
            params: {
                id: $routeParams.id,
                name: $scope.animal.name,
                image: $scope.animal.image,
                description: $scope.animal.description,
                specie: $scope.animal.specie
            }
        }).then(function(succ) {
            $scope.animal = succ.data;
        }, function(err) {
            console.error(err);
        });
    }
});
