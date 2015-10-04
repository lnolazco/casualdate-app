'use strict'
angular.module('casualApp')
.controller('ContactlistCtrl', ['$scope', 'contactService', '$location', function ($scope, contactService, $location) {
  contactService.getContactsNearToMe('user', function (myposition,contacts) {
    $scope.contacts = contacts;
  });
  $scope.openChat = function (contact) {
    console.log('hola cola');
  }
}]);
