
const { Model, DataTypes } = require('sequelize');

class Registration extends Model {
  static init(sequelize) {
    super.init({
    cod:DataTypes.INTEGER,
    nome_dis:DataTypes.STRING,
    cep:DataTypes.STRING,
    email:DataTypes.STRING,
    nome_rua:DataTypes.STRING,
    nome_bairro:DataTypes.STRING,
    nome_municipio:DataTypes.STRING,
    numero:DataTypes.STRING,
    uf:DataTypes.STRING,
    status:DataTypes.INTEGER,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.Customer,{ foreignKey: 'customer_id', as:'customers' })
    this.belongsToMany(models.Activitie, { foreignKey: 'registration_id', through: 'registrations_activities', as: 'activities' });
    this.hasMany(models.Term,{ foreignKey: 'registration_id', as:'terms' })
    this.hasMany(models.Attendant,{ foreignKey: 'registration_id', as:'attendants' })
  }
 

}

module.exports = Registration;



