myApp.directive("classifiedCard", function(){

  return {
    templateUrl: 'app/classifieds/card/classified-card.tpl.html',
    scope: {
      items: "=items",
      itemsFilter: "=itemsFilter",
      category: "=category"
    },
    controller: classifiedCardController,
    controllerAs: "vm" 
  }

  function classifiedCardController($state, $scope, $mdDialog, $mdToast, classifiedsFactory) {

    var vm = this;
    vm.items;
    vm.items = classifiedsFactory.ref; 
    vm.editItem = editItem;
    vm.deleteItem = deleteItem;

    function editItem(item){
      $state.go('classifieds.edit', {
        id: item.$id
      });
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
  }

});