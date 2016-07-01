angular.module('app.services', ['dbConfig'])

.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    self.init = function() {
      // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
      // self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name});
      self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

      angular.forEach(DB_CONFIG.tables, function(table) {
          var columns = [];

          angular.forEach(table.columns, function(column) {
              columns.push(column.name + ' ' + column.type);
          });

          var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(', ') + ')';

          self.query(query);
      });
    };

    self.query = function(query, bindings) {
      bindings = typeof bindings !== 'undefined' ? bindings : [];
      var deferred = $q.defer();

      self.db.transaction(function(transaction) {
          transaction.executeSql(query, bindings, function(transaction, result) {
              deferred.resolve(result);
          }, function(transaction, error) {
              deferred.reject(error);
          });
      });

      return deferred.promise;
    };

    self.fetchAll = function(result) {
      var output = [];

      for (var i = 0; i < result.rows.length; i++) {
          output.push(result.rows.item(i));
      }
      return output;
    };

    self.fetch = function(result) {
      return result.rows.item(0);
    };

    return self;
})

.factory('Permanencia', function(DB) {
  var self = this;

  self.all = function() {
    return DB.query('SELECT * FROM permanencia WHERE ativo = 1')
    .then(function(result){
        return DB.fetchAll(result);
    });
  };

  self.deleteAll = function() {
    return DB.query('DELETE FROM permanencia')
    .then(function(result){
        return DB.fetchAll(result);
    }, function(result){
      console.log(result);
    });
  };

  self.iniciar = function(placa, data_entrada, hora_entrada, ativo){
    return DB.query('INSERT INTO permanencia (placa, data_entrada, hora_entrada, ativo) VALUES (?, ?, ?, ?)', [placa, data_entrada, hora_entrada, ativo])
    .then(function(result){
      console.log('result sucesso',result);
      return DB.fetchAll(result);
    }, function(result){
      console.log('result falha',result);
    });
  }

  self.getById = function(id) {
      return DB.query('SELECT * FROM permanencia WHERE id = ?', [id])
      .then(function(result){
          return DB.fetch(result);
      });
  };

  self.encerrar = function(data_saida, hora_saida, ativo, tempo, valor_pago, id) {
      return DB.query('UPDATE permanencia SET data_saida = ?, hora_saida = ?, ativo = ?, tempo = ?, valor_pago = ? WHERE id = ?', [data_saida, hora_saida, ativo, tempo, valor_pago, id])
      .then(function(result){
        return
      });
  };

  return self;
})

.factory('Valor', function(DB) {
  var self = this;

  self.all = function() {
      return DB.query('SELECT * FROM valor')
      .then(function(result){
          return DB.fetchAll(result);
      });
  };

  self.deleteAll = function() {
    return DB.query('DELETE FROM valor')
    .then(function(result){
        return DB.fetchAll(result);
    }, function(result){
      console.log(result);
    });
  };

  self.insert = function(hora, adicional){
    return DB.query('INSERT INTO valor (hora, adicional) VALUES (?, ?)', [hora, adicional])
    .then(function(result){
        return DB.fetchAll(result);
        console.log('result falha',result);
    }, function(result){
      console.log('result falha',result);
    });
  }

  return self;
});
