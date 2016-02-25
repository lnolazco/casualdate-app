'use strict'
angular.module('casualApp')
.factory('contactFactory',['$resource', function ($resource) {
  return $resource('http://localhost:3000/api/contacts/:option',{},{
    save: { method: 'POST'},
    update: { method: 'PUT' },
    get: {method: 'GET', isArray: false,params: {filter:'@filter'}}
  });
}])
.service('contactService',['contactFactory', 'userData', 'statusFactory', 'nearbyFactory', function (contactFactory, userData, statusFactory, nearbyFactory) {
  this.getContact = function (userId) {
    return contactFactory.get({option:'findOne'},{
      filter: {
        where: {userId: userId}
      }
    });
  };
  this.getContactByAlias = function (alias) {
    return contactFactory.get({option:'findOne'},{
      filter: {
        where: {alias: alias}
      }
    });
  };
  this.save = function (contact) {
    if (contact.id !== undefined)
      return contactFactory.update(contact);
    else
      return contactFactory.save(contact);
  };
  this.geocoder = new google.maps.Geocoder();
  //get user position
  var getUserPosition = function (f) {
    if (userData.timestampPosition !== null){
      console.log('reuse user position');
      f.call(null, userData.position);
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('got user position');
        userData.timestampPosition = new Date();
        userData.position = position;
        f.call(null, position);
      });
    } else {
      console.log('Unable to locate current position');
    }
  };
  this.getUserPosition = getUserPosition;
  //get distance to look for
  var getDistanceToLookFor = function (user, f) {
    f.call(null, 10);
    return;
  };
  this.getDistanceToLookFor = getDistanceToLookFor;

  this.getContactsNearToMe = function (user, f) {
    //get user position
    getUserPosition(function (position) {
      //get distance to look for
      getDistanceToLookFor(user, function (distance) {
        //get contacts
        nearbyFactory.query({},{
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          max: distance
        }, function (data) {
          f.call(null, position, data);
        });
      });

    });
  };
}])
;
