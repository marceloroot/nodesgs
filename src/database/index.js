const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Activitie = require('../models/Activitie');
const Attendant = require('../models/Attendant');
const Customer = require('../models/Customer');
const Registration = require('../models/Registration');
const Term = require('../models/Term');

const User = require('../models/User')


const connection = new Sequelize(dbConfig);

User.init(connection);
Customer.init(connection);
Registration.init(connection);
Activitie.init(connection);
Attendant.init(connection);
Term.init(connection);



//associate
User.associate(connection.models);
Customer.associate(connection.models);
Registration.associate(connection.models);
Activitie.associate(connection.models);
Attendant.associate(connection.models);
Term.associate(connection.models);