
const { Model, DataTypes } = require('sequelize');

class Endereco extends Model {
  static init(sequelize) {
    super.init({
    cep:DataTypes.STRING,
    logradouro:DataTypes.STRING,
    complemento:DataTypes.STRING,
    bairro:DataTypes.STRING,
    localidade:DataTypes.STRING,
    numero:DataTypes.STRING,
    uf:DataTypes.STRING,
    status:DataTypes.INTEGER,
    
    }, {
      sequelize
    });
  };


  static associate(models){
  this.hasMany(models.Equipamento,{ foreignKey: 'endereco_id', as:'equipamento' })
  this.hasMany(models.Pessoa,{ foreignKey: 'endereco_id', as:'pessoa' })
  }
 

}

module.exports = Endereco;
