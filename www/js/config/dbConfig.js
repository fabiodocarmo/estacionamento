angular.module('dbConfig', [])
.constant('DB_CONFIG', {
    name: 'MYDB',
    tables: [
      {
            name: 'permanencia',
            columns: [
                {name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT'},
                {name: 'placa', type: 'TEXT'},
                {name: 'data_entrada', type: 'TEXT'},
                {name: 'hora_entrada', type: 'TEXT'},
                {name: 'data_saida', type: 'TEXT'},
                {name: 'hora_saida', type: 'TEXT'},
                {name: 'tempo', type: 'NUMERIC(10,2)'},
                {name: 'valor_pago', type: 'NUMERIC(10,2)'},
                {name: 'ativo', type: 'INTEGER'}
            ]
        },
        {
              name: 'valor',
              columns: [
                  {name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT'},
                  {name: 'hora', type: 'NUMERIC(10,2)'},
                  {name: 'adicional', type: 'NUMERIC(10,2)'}
              ]
          }
    ]
});
