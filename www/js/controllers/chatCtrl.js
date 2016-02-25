'use strict'
angular.module('casualApp')
.controller('ChatCtrl',['$scope', 'userData', '$stateParams', 'contactService','defaultValues', function ($scope, userData, $stateParams, contactService, defaultValues) {
    //get data of contact.
    contactService.getContact($stateParams.id).$promise.then(function (data) {
        if (typeof data === "undefined") return;
        startChat(data);
    });
    var startChat = function (d) {
        $scope.ctrl = { messageText: ''};
        $scope.contact = d;
        $scope.me = userData.model;

        //socket io
        var socket = io.connect(defaultValues.urlSocketIo);
        var myId = $scope.me.userId;
        var otherId = $scope.contact.userId;
        var conversation_id = myId > otherId ? myId + 'y' + otherId : otherId + 'y' + myId;
        socket.emit('subscribe', conversation_id);

        $scope.messages = [];
        $scope.sendMsg = function () {
        socket.emit('chat message',
          {
            room: conversation_id,
            message: {
              alias: $scope.me.alias,
              text: $scope.ctrl.messageText
            }
          }
        );
        $scope.ctrl.messageText = '';
        };
        //select picture
        var selectPicture = function (contact) {
        if (typeof contact.picture === "undefined" || contact.picture.length === 0){
          if (typeof contact.gender === "undefined") return "img/male.png";
          return contact.gender === 'M' ? 'img/male.png' : 'img/female.png';
        }
        else
          return contact.picture;
        };
        socket.on('conversation private post', function(data){
            var side, avatar;
            if (data.message.alias === $scope.me.alias){
                side = 'right';
                avatar = selectPicture($scope.me);
            }
            else{
                side = 'left';
                avatar = selectPicture($scope.contact);
            }
            $scope.$apply(function () {
                $scope.messages.push({
                    side:  side,
                    text: data.message.text,
                    avatar: avatar
                });
            });
            // Animate
            $("#viewport-content").animate({
                bottom: $("#viewport-content").height() - $("#viewport").height()
            }, 250);
        });

    }


}]);
