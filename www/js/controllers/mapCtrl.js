'use strict'
angular.module('casualApp')
.controller('MapCtrl',['$scope', 'uiGmapIsReady','contactService','defaultValues', function ($scope, uiGmapIsReady, contactService, defaultValues){
    $scope.showWindow = false;
    $scope.contactPosition = {};
    $scope.contact = {};
    $scope.markers = { models: [], control: {} };

    $scope.map = defaultValues.map;

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
    //function prints contacts in the map
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

    //when the user click on a marker in the map => it opens a mapwindow with the contact information
    $scope.openContact = function (a, b, marker) {
        $scope.contactPosition = marker;
        contactService.getContact(marker.userId).$promise.then(function (data) {
            if (data === undefined) return;
            $scope.showWindow = true;
            $scope.contact = data;
        });
    };
    $scope.closeClick = function () {
        $scope.showWindow = false;
        $scope.contact = {};
    };
}]);
