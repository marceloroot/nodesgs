
const { Model, DataTypes } = require('sequelize');

class Equipamento extends Model {
  static init(sequelize) {
    super.init({
    nome:DataTypes.STRING,
    responsavel:DataTypes.STRING,
    sobre:DataTypes.STRING,
    observacao:DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ["A", "I", "E"]
    },
  
    
    }, {
      sequelize
    });
  };


  static associate(models){
   this.belongsTo(models.Endereco,{ foreignKey: 'endereco_id', as:'endereco' })
   this.hasMany(models.Usuario,{ foreignKey: 'equipamento_id', as:'usuarios' })
  }
 

}

module.exports = Equipamento;



  


