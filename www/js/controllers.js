angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, Walkscore) {
  $scope.Search={"value" : ""};
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.search = function() {
    console.log($scope.Search);
    Walkscore.latLong($scope.Search.value).then(function(data) { 
      var lat = data.results[0].geometry.location.lat
      var lng = data.results[0].geometry.location.lng

      Walkscore.getAll($scope.Search.value,lat,lng).then(function(data) {
        console.log(data);
          $scope.results=data;
      }, function(err) {
        console.log(err);
      }); 
    });
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId); 
})

.controller('AccountCtrl', function($scope, Walkscore) {
  $scope.settings = {
    enableFriends: true
  }
  
});
