'use strict'
angular.module('casualApp')
.factory('statusFactory',['$resource', function($resource){
  return $resource('http://localhost:3000/api/statuses', {}, {
              save: { method: 'POST'},
              update: { method: 'PUT' },
              remove: { method: 'DELETE'},
              query: { method: 'GET', isArray: true}
          });
}])
.factory('nearbyFactory',['$resource', function($resource){
  return $resource('http://localhost:3000/api/statuses/nearby', {}, {
              query: { method: 'GET', isArray: true, params: {lat: '@lat',lng: '@lng', max: '@max'}}
          });
}])
.service('statusService',['statusFactory', 'nearbyFactory', function (statusFactory, nearbyFactory) {
  this.save = function (userId, status, position) {
    var status = {
      userId:userId,
      status:status,
      loc: {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      },
      timestamp: new Date()
      };
    return statusFactory.save({},status);
  };
}]);
