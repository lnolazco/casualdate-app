angular.module('starter.controllers', [])

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
})
.controller('MapCtrl',['$scope', 'uiGmapIsReady', 'geoService','statusService','contactService', function ($scope, uiGmapIsReady, geoService, statusService, contactService){
  //define scope variables
  $scope.map = geoService.map;
  //default position
  $scope.map.options =  {
    disableDefaultUI: !0,
    mapTypeControl: !1,
    tilt: 45
  };
  $scope.markers = {
    models: [],
    control: {}
  };
  //add loading gif
//  var loadingContainer = $("<div class='map-container-loading'></div>");
  //$(".map-container").append(loadingContainer);

  //get my position
  uiGmapIsReady.promise(1).then(function(instances) {
    instances.forEach(function(inst) {
      geoService.getCurrentPosition(function (position) {

        $scope.map.control.refresh({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
          }
        );
        //get contacts that match with my settings and paint them on the map
        setMarkers(position);

        //$(".map-container-loading").remove(); //remove loading gif
      });
    });
  });
  //function to get contacts match with my settings
  var setMarkers = function (position) {
    statusService.getMapStatuses(position,10).$promise.then(function (data) {
      var i = 1;
      data.forEach(function (d) {
        $scope.markers.models.push({
          id: i++,
          latitude: d.loc.lat,
          longitude: d.loc.lng,
          icon: 'img/status' + d.status + '-xs.png',
          userId: d.userId
        });
      });
    },
    function(reason){
      console.log('error: ' + reason);
    });
  };

  /*
  //get my contact information
  contactService.getContact($("#userid").val()).$promise.then(function (data) {
    if (typeof data === "undefined") return; //you need to add your contact information go to settings here.
    chatData.myModel = data;
  })
  */
  //when the user click on a marker in the map => it opens a mapwindow with the contact information
  $scope.openContact = function (a, b, marker) {
    $scope.contact.position = {
      latitude: marker.latitude,
      longitude: marker.longitude,
    };
    contactService.getContact(marker.userId).$promise.then(function (success) {
      $scope.contact.model = {};
      if (success === undefined) return;
      $scope.contact.show = true;
      $scope.contact.model = success;
      //chatData.contactModel = success;
    });
  };
  $scope.closeClick = function () {
    $scope.contact = {
      show: false,
      model: {}
    };
  };
  $scope.contact = {
    show: false,
    model: {}
  };
}])
.controller('ChatCtrl',['$scope', function ($scope) {
  
}])
;
