myApp.controller('myController', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
   
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


  classifiedsFactory.getClassifieds().then(function(items){
    vm.items = items.data;
    vm.categories = getCategories(vm.items);
    // console.log($scope.items);
  });

  var contact = {
    name: "Flash",
    phone: "555-555-444"
  }

  function openSidebar() {
    $mdSidenav('left').open();
  }

  function closeSidebar() {
    $mdSidenav('left').close();
  }

  function saveItem() {
    if(item) {
      item.contact = contact;
      vm.items.push(item);
      vm.item = {};
      closeSidebar();   
      showToast("Item saved!");
    }
  }

  function editItem(item){
    vm.editing = true;
    openSidebar();
    vm.item = item;
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
      var index = vm.items.indexOf(item);
      vm.items.splice(index, 1);      
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
