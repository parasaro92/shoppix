myApp.controller('myController', function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
   
  var vm = this;
  
  vm.categories;
  vm.item;
  vm.items;
  vm.closeSidebar = closeSidebar;  
  vm.deleteItem = deleteItem;
  vm.editing;
  vm.editItem = editItem;
  vm.openSidebar = openSidebar;
  vm.saveItem = saveItem;
  // vm.saveEdit = saveEdit;

  vm.items = classifiedsFactory.ref; 
  vm.items.$loaded().then(function(items){
    vm.categories = getCategories(items);
  });
  // classifiedsFactory.getClassifieds().then(function(items){
  //   vm.items = items.data;
  //   vm.categories = getCategories(vm.items);
  //   // console.log($scope.items);
  // });

  $scope.$on('newItem', function(event, item){
    vm.items.$add(item);
    showToast('Item saved!');
  });

  $scope.$on('editSaved', function(event, message){
    showToast(message);
  });

  var contact = {
    name: "Flash",
    phone: "555-555-444"
  }

  function openSidebar() {
    $state.go('classifieds.new');
  }

  function closeSidebar() {
    $mdSidenav('left').close();
  }

  function saveItem(item) {
    if(item) {
      item.contact = contact;
      vm.items.push(item);
      vm.item = {};
      closeSidebar();   
      showToast("Item saved!");
    }
  }

  function editItem(item){
    $state.go('classifieds.edit', {
      id: item.$id
    });
  }

  function saveEdit() {
    vm.editing = false;
    vm.item = {};
    closeSidebar();
    showToast("Edit saved!");
  }

  function deleteItem(event, item) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete' + item.title + '?')
      .ok('Yes')
      .cancel('No')
      .targetEvent(event);
    $mdDialog.show(confirm).then(function(){
      vm.items.$remove(item);
      showToast('Item deleted');     
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

  function getCategories(items) {
    var categories = [];

    angular.forEach(items, function(item){
      angular.forEach(item.categories, function(category){
        categories.push(category);
      });
    }); 

  return _.uniq(categories);
  }

  
}); 
