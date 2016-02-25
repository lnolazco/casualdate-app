angular.module('casualApp')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, contactService, userData) {
  //if user loged in => exit
  //otherwise user needs to log in
  if (userData.model.id !== undefined) return;

  //get position
  contactService.getUserPosition(function (position) {
      //DONE!
  });

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
//    $scope.modal.hide();
  };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        contactService.getContactByAlias($scope.loginData.username).$promise.then(function (data) {
            console.log(data);
            userData.model = data;
            $scope.modal.hide();
        }, function (reason) {
            //console.log(reason);
        });
    };
})
;
