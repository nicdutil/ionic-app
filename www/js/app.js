// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'



angular.module('dataServices', []).

    service('imageService', ['$http', function ($http) {
        console.log('instantiating image Service');
        this.getImageName = function () {
            console.log('calling get Image Name');
            return $http({
                method: 'GET',
                url: 'http://img-service.herokuapp.com/api/list',
                params: {'type':'images'}
            });
        }
    }]);

angular.module('starter', ['ionic','dataServices'])

    .run(function ($ionicPlatform, $ionicLoading) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            $ionicLoading.show({'template':'Loading...'});
        });
    }).
    controller('listCtrl', function ($scope, $window, $timeout, $ionicLoading, imageService,$ionicModal) {
        $scope.items = [];
        $scope.activeItem = {};
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        imageService.getImageName().then(function(response) {
            if (response.status === 200) {
                $scope.items = response.data;
                $timeout($ionicLoading.hide,10);
            }
        });
        $scope.showPicture = function(item,index) {
            $scope.activeItem = item;
            $scope.activeItem.file = item.name + '.jpg';
            $scope.modal.show();
        }
    });

