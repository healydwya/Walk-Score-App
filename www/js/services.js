angular.module('starter.services', [])

.factory('Chats', function() {

  // Might use a resource here that returns a JSON array

 

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'New York',
    lastText: '',
    face: 'img/nyc.jpg'
  }, {
    id: 1,
    name: 'San Francisco',
    lastText: '',
    face: 'img/SF.jpg'
  }, {
    id: 2,
    name: 'Philadelphia',
    lastText: '',
    face: 'img/philadelphia.jpg'
  }, {
    id: 3,
    name: 'Boston',
    lastText: '',
    face: 'img/boston.jpg'
  }, {
    id: 4,
    name: 'Miami',
    lastText: '',
    face: 'img/miami.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Walkscore', function($window, $http, $q, $timeout) {
  ////////////
  // Service declaration
  var service = {
      getAll: getAll,
      latLong: latLong
  };
  return service;

  ////////////
  // Service returns
  function latLong(search) {
    var result = $q.defer();
    var httpRequest = $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + search.split(' ').join('+'),
        cache: false
    });

    httpRequest.success(function(data, status, headers, config) {
        result.resolve(data);
    });
    httpRequest.error(function(data, status, headers, config) {
        result.reject(data);
    });

    return result.promise;
  }

  function getAll(search, lat, lng) {
      console.log(search.split(' ').join("%20")); 
      var result = $q.defer();
      var httpRequest = $http({
          method: 'GET',
          url: 'http://api.walkscore.com/score?format=json&address='+search.split(' ').join("%20")+"&lat=" + lat +  "&lon=" + lng +'&wsapikey=8d30f22cd2fd7a34898c32c9f2ac8676',
          cache: false
      });

      httpRequest.success(function(data, status, headers, config) {
          result.resolve(data);
      });
      httpRequest.error(function(data, status, headers, config) {
          result.reject(data);
      });

      return result.promise;
  }

  
})
