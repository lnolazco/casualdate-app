'use strict'
angular.module('casualApp')
.controller('MapCtrl',['$scope', 'uiGmapIsReady','statusService','contactService','chatData', function ($scope, uiGmapIsReady, statusService, contactService, chatData){
  //define scope variables
  $scope.map = {
      center: { latitude: 41.4, longitude: 2.2},
      zoom: 14,
      control: {},
      bounds: {}
    };
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

      contactService.getContactsNearToMe('user', function (myposition, contacts) {
        $scope.map.control.refresh({
          latitude: myposition.coords.latitude,
          longitude: myposition.coords.longitude
          }
        );
        setMarkers(contacts);
        //$(".map-container-loading").remove(); //remove loading gif
      });
    });
  });
  //function to get contacts match with my settings
  var setMarkers = function (data) {
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
  };

  //get my contact information
  var userId = "55b67851a397dccb1379a99d";
  contactService.getContact(userId).$promise.then(function (data) {
    if (typeof data === "undefined") return; //you need to add your contact information go to settings here.
    chatData.myModel = data;
  })

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
      chatData.contactModel = success;
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
}]);
