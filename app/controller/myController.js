myApp.controller('myController', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
    
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
      showToast("Item saved!");
    }
  }

  $scope.editItem = function(item){
    $scope.editing = true;
    $scope.openSidebar();
    $scope.item = item;
  }

  $scope.saveEdit = function() {
    $scope.editing = false;
    $scope.item = {};
    $scope.closeSidebar();
    showToast("Edit saved!");
  }

  $scope.deleteItem = function(event, item) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete' + item.title + '?')
      .ok('Yes')
      .cancel('No')
      .targetEvent(event);
    $mdDialog.show(confirm).then(function(){
      var index = $scope.items.indexOf(item);
      $scope.items.splice(index, 1);      
    }, function(){

    });   
  }

  function showToast(message) {
    $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position('top, right')
          .hideDelay(3000)
      ); 
  }

}); 
