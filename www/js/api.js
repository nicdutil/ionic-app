/**
 * Created by nic on 1/27/2015.
 */


angular.module('dataServices', []).

    service('imageService', ['$http', function ($http) {

        this.getImageName = function () {

            return $http.get({
                method: 'GET',
                url: '192.168.1.5:3001/api/list',
                params: 'type=images'
            });
        }
    }]);