angular.module('app.routes', ['inicialCtrl',
                              'configuracaoCtrl',
                              'mensalistaCtrl',
                              'configuracaoCtrl',
                              'rotativoCtrl'])

.config(function($stateProvider,
                 $urlRouterProvider) {

  $stateProvider
  .state('menu.inicial', {
    url: '/inicial',
    views: {
      'side-menu': {
        templateUrl: 'templates/inicial.html',
        controller: 'inicialCtrl',
        controllerAs : 'self'
      }
    }
  })

  .state('menu.rotativo-entrada', {
    url: '/entrada',
    views: {
      'side-menu': {
        templateUrl: 'templates/rotativo/entrada.html',
        controller: 'rotativoCtrl',
        controllerAs : 'self'
      }
    }
  })

  .state('menu.rotativo-saida', {
    url: '/saida',
    params: {
      listaPermanencias:null
    },
    views: {
      'side-menu': {
        templateUrl: 'templates/rotativo/saida.html',
        controller: 'rotativoCtrl',
        controllerAs : 'self'
      }
    }
  })

  .state('menu.rotativo-saida-detalhe', {
    url: '/saida',
    params:{
          permanencia: null
    },
    views: {
      'side-menu': {
        templateUrl: 'templates/rotativo/detalhe.html',
        controller: 'rotativoCtrl',
        controllerAs : 'self'
      }
    }
  })

  .state('menu.mensalista', {
    url: '/mensalista',
    views: {
      'side-menu': {
        templateUrl: 'templates/mensalista/mensalista.html',
        controller: 'mensalistaCtrl',
        controllerAs : 'self'
      }
    }
  })

  .state('menu.configuracao', {
    url: '/configuracao',
    views: {
      'side-menu': {
        templateUrl: 'templates/configuracao/configuracao.html',
        controller: 'configuracaoCtrl',
        controllerAs : 'self'
      }
    }
  })

  .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/side-menu/inicial')

});
