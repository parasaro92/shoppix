myApp.controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){

  var vm = this;
  vm.closeSidebar = closeSidebar;
  vm.saveItem = saveItem;

  $timeout(function(){
    $mdSidenav('left').open();
  });

  $scope.$watch('vm.sidenavOpen', function(sidenav){
    if(sidenav === false){
      $mdSidenav('left')
        .close()
        .then(function(){
          $state.go('classifieds');
        });
    }
  });

  function closeSidebar() {
    vm.sidenavOpen = false;
  }

  function saveItem(item){
    if(item){

      item.contact = {
        name: "John",
        phone: "123-456-789",
        email: "john5@gmail.com"
      }

      $scope.$emit('newItem', item);
      vm.sidenavOpen = false;
    }
  }
});