angular.module('rotativoCtrl', [])

.controller('rotativoCtrl', rotativoCtrl);

function rotativoCtrl($scope,
                      Permanencia) {
  var self = this;

  $scope.$on('$ionicView.enter', function(){
     self.listarTodos();
  });

  self.listarTodos = function(){
     Permanencia.all().then(function(result){
       console.log('Result: ',result);


       //self.permanencias = result;
     });
   };

  self.permanencia = {
    entrada : {
      moment:  moment(),
      data : {
        dia : parseInt(moment().format('DD')),
        mes : parseInt(moment().format('MM')),
        ano : parseInt(moment().format('YYYY'))
      },
      hora : {
        horas : parseInt(moment().format('hh')),
        minutos: parseInt(moment().format('mm'))
      }
    },
    saida: {
      moment:  '',
      data : {
        dia : '',
        mes : '',
        ano : ''
      },
      hora : {
        horas : '',
        minutos: ''
      }
    },
    placa : {
      letras: '',
      numeros: ''
    }
  };

  self.validarPermanencia = function(){
    if(self.permanencia.placa.letras != null &&
       self.permanencia.placa.letras != '' &&
       self.permanencia.placa.numeros != null &&
       self.permanencia.placa.numeros != ''){
      return true;
    } else{
      return false;
    }
  };

  self.iniciarPermanencia = function(){
    if(self.validarPermanencia()){
      var placa = self.permanencia.placa.letras.toUpperCase() + "-" + self.permanencia.placa.numeros;
      var data = self.permanencia.entrada.data.dia + '/' + self.permanencia.entrada.data.mes + '/' + self.permanencia.entrada.data.ano;
      var hora = self.permanencia.entrada.hora.horas + ':' + self.permanencia.entrada.hora.minutos;

      Permanencia.iniciar(placa, data, hora, 1);
    } else {
      alert('Prencha todos os campos!');
    }
  };

  self.limparCampos = function(){
    self.permanencia = {
      entrada : {
        moment:  moment(),
        data : {
          dia : parseInt(moment().format('DD')),
          mes : parseInt(moment().format('MM')),
          ano : parseInt(moment().format('YYYY'))
        },
        hora : {
          horas : parseInt(moment().format('hh')),
          minutos: parseInt(moment().format('mm'))
        }
      },
      saida: {
        moment:  '',
        data : {
          dia : '',
          mes : '',
          ano : ''
        },
        hora : {
          horas : '',
          minutos: ''
        }
      },
      placa : {
        letras: '',
        numeros: ''
      }
    };
  };

};
