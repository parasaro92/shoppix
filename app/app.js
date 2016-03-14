var myApp = angular
  .module('myApp', ['ngMaterial', 'ui.router', 'firebase'])
  .config(function($mdThemingProvider, $stateProvider){

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');

  $stateProvider
    .state('classifieds', {
      url: '/classifieds',
      templateUrl: 'app/classifieds/classifieds.tpl.html',
      controller: 'myController as vm'
    })
    
    .state('classifieds.new', {
      url: '/new',
      templateUrl: 'app/classifieds/new/classifieds.new.tpl.html',
      controller: 'newClassifiedsCtrl as vm'
    })

    .state('classifieds.edit', {
      url: '/edit/:id',
      templateUrl: 'app/classifieds/edit/classifieds.edit.tpl.html',
      controller: 'editClassifiedsCtrl as vm',
      params: {
        item: null
      }
    });
});