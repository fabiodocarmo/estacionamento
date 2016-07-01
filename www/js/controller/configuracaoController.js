angular.module('configuracaoCtrl', [])

.controller ('configuracaoCtrl', configuracaoCtrl);

function configuracaoCtrl($scope,
                          Valor) {
  var self = this;

  self.valor = {
    hora : '',
    adicional : ''
  };

  $scope.$on('$ionicView.enter', function(){
     self.listarTodos();
  });

 self.listarTodos = function(){
   Valor.all().then(function(result){
     self.valor = result;
   });
 };

  self.salvarPreco = function(preco){
    if (self.valor.hora != null
      && self.valor.adicional != null
      && self.valor.hora != ''
      && self.valor.adicional != ''){
      Valor.deleteAll();
      Valor.insert(self.valor.hora, self.valor.adicional).then(function(){
        self.listarTodos();
      });
    } else {
      self.limparCampos();
      alert('Todos os campos são obrigatórios');
    }
  };

  self.limparCampos = function(){
    self.valor.hora = '';
    self.valor.adicional = '';
  };
};
