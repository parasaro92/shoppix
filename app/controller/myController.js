myApp.controller('myController', function($scope, $http, classifiedsFactory, $mdSidenav){
    
  classifiedsFactory.getClassifieds().then(function(items){
    $scope.items = items.data;
    // console.log($scope.items);
  });

  $scope.openSidebar = function() {
    $mdSidenav('left').open();
  }

  $scope.closeSidebar = function() {
    $mdSidenav('left').close();
  }


}); 
