// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('casualApp', ['ionic', 'ngResource', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }
        }
    })
    .state('app.map', {
        url: '/map',
        views: {
            'menuContent': {
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            }
        }
    })
    .state('app.contactlist', {
        url: '/contactlist',
        views: {
            'menuContent': {
                templateUrl: 'templates/contactlist.html',
                controller: 'ContactlistCtrl'
            }
        }
    })
    .state('app.chat', {
        url: '/chat/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/chat.html',
                controller: 'ChatCtrl'
            }
        }
    })
    .state('app.crush', {
        url: '/crush',
        views: {
            'menuContent': {
                templateUrl: 'templates/crush.html',
                controller: 'CrushCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
})
.value('userData', {
  timestampPosition: null,
  position: {},
  model: {}
})
.constant('defaultValues', {
    map: {
        center: { latitude: 41.4, longitude: 2.2},
        zoom: 14,
        control: {},
        bounds: {},
        options:  {
            disableDefaultUI: !0,
            mapTypeControl: !1,
            tilt: 45
        }
    },
    urlSocketIo : 'http://localhost:3000'
});
