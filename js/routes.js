angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.membros', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/membros.html',
        controller: 'membrosCtrl'
      }
    }
  })

  .state('menu.reuniEs', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/reuniEs.html',
        controller: 'reuniEsCtrl'
      }
    }
  })

  .state('menu.info', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/info.html',
        controller: 'infoCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })
  .state('menu.aniversariantes', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aniversariantes.html',
        controller: 'AniversariantesCtrl'
      }
    }
  })
$urlRouterProvider.otherwise('/page4')  

});