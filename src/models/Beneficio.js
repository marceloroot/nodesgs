
const { Model, DataTypes } = require('sequelize');

class Beneficio extends Model {
  static init(sequelize) {
    super.init({
      nome:DataTypes.STRING,
      descricao:DataTypes.STRING,
      categoria:DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["A", "I", "E"]
      },
    
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsToMany(models.Pessoa, { foreignKey: 'beneficios_id', through: 'pessoas_beneficios', as: 'pessoas' });
    this.hasMany(models.Entrega,{ foreignKey: 'beneficios_id', as:'entregas' }) 
  }
 

}

module.exports = Beneficio;


