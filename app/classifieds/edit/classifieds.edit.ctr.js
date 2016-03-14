myApp.controller('editClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){

  var vm = this;
  vm.items = classifiedsFactory.ref; 
  vm.closeSidebar = closeSidebar;
  vm.saveEdit = saveEdit;
  vm.item = vm.items.$getRecord($state.params.id); // getting the id of item from firebase

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

  function saveEdit() {
    vm.items.$save(vm.item).then(function(){
    $scope.$emit('editSaved', 'Edit saved!');
    vm.sidenavOpen = false;
    });
  }
});