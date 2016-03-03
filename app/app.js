var myApp = angular
  .module('myApp', ['ngMaterial', 'ui.router'])
  .config(function($mdThemingProvider, $stateProvider){

  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');

  $stateProvider
    .state('classifieds', {
      url: '/classifieds',
      templateUrl: 'app/classifieds/classifieds.tpl.html',
      controller: 'myController as vm'
    });
});