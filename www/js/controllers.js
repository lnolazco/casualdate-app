angular.module('casualApp')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, userFactory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    userFactory.post($scope.loginData, function (success) {
      console.log('success login');
    }, function (reason) {
      console.log(reason);
    });

//    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, statusFactory) {
  $scope.playlists = [];
  statusFactory.query(function (data) {
    data.forEach(function (entry) {
      $scope.playlists.push({id: entry.id, title: entry.userId});
    });
  });

  //si esta logueado crea objecto select circular
  var images = ['img/status1.png',
          'img/status2.png',
          'img/status3.png'];
  SelectCircular('selDemo',images, 70, function(val){
    console.log('image selected: ' + val);
  });
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
