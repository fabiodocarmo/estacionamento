angular.module('inicialCtrl', [])

.controller('inicialCtrl', inicialCtrl);

function inicialCtrl($scope,
                     $state) {
  var self = this;

  self.chamarTelaEntrada = function(){
    $state.go('menu.rotativo-entrada');
  };

  self.chamarTelaSaida = function(){
    $state.go('menu.rotativo-saida');
  };
};
