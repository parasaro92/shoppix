myApp.controller('myController', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast){
    
  classifiedsFactory.getClassifieds().then(function(items){
    $scope.items = items.data;
    // console.log($scope.items);
  });

  var contact = {
    name: "Flash",
    phone: "555-555-444"
  }

  $scope.openSidebar = function() {
    $mdSidenav('left').open();
  }

  $scope.closeSidebar = function() {
    $mdSidenav('left').close();
  }

  $scope.saveItem = function(item) {
    if(item) {
      item.contact = contact;
      $scope.items.push(item);
      $scope.item = {};
      $scope.closeSidebar();
      $mdToast.show(
        $mdToast.simple()
          .content("Item Saved!")
          .position('top, right')
          .hideDelay(3000)
      );    
    }
  }

}); 
