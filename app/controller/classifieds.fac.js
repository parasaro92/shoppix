

  myApp.factory("classifiedsFactory", function($http, $firebaseArray){

    var ref = new Firebase('https://shoppix.firebaseio.com/');

    return {
      ref: $firebaseArray(ref)
    }
  });
