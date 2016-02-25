angular.module('casualApp')
.factory('crushFactory', ['$resource',function ($resource) {
  return $resource('http://localhost:3000/auth/local', {}, {
              post: { method: 'POST'}
          });
}])
.service('crushService', ['crushFactory', function (crushFactory) {
    this.getPeople = function (data) {
        
    };
    // angle and distance in meters betwen 2 positions
    this.getAngleAndDistance = function (lat1, lon1, lat2, lon2){
        // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var adyacent = (lat2 - lat1);
        var opposite = (lon2 - lon1);

        var angle = Math.atan2(adyacent,opposite)* 180/Math.PI;

        var dLat = (adyacent) * Math.PI / 180;
        var dLon = (opposite) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var dist = R * c * 1000; //meters
        return {x: angle, y: dist};
    };
}]);
