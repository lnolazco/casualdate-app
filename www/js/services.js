angular.module('casualApp')
.factory('userFactory', ['$resource',function ($resource) {
  return $resource('http://localhost:3000/auth/local', {}, {
              post: { method: 'POST'}
          });
}]);
