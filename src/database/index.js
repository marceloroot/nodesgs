const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Endereco = require('../models/Endereco');
const Equipamento = require('../models/Equipamento');
const Usuario = require('../models/Usuario');
const Permissoe = require('../models/Permissoe');
const Entrega = require('../models/Entrega');
const Beneficio = require('../models/Beneficio');
const Pessoa = require('../models/Pessoa');



const connection = new Sequelize(dbConfig);

Endereco.init(connection);
Equipamento.init(connection);
Usuario.init(connection);
Permissoe.init(connection);
Entrega.init(connection);
Beneficio.init(connection);
Pessoa.init(connection);



//associate
Endereco.associate(connection.models);
Equipamento.associate(connection.models);
Usuario.associate(connection.models);
Permissoe.associate(connection.models);
Entrega.associate(connection.models);
Beneficio.associate(connection.models);
Pessoa.associate(connection.models);