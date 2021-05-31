
const { Model, DataTypes } = require('sequelize');

class Entrega extends Model {
  static init(sequelize) {
    super.init({
        quantidade:DataTypes.INTEGER,
        observacao:DataTypes.STRING,
        datacadastro:DataTypes.DATE,
    }, {
      sequelize
    });
  };


  static associate(models){
 this.belongsTo(models.Pessoa,{ foreignKey: 'pessoas_id', as:'pessoa' })
 this.belongsTo(models.Usuario,{ foreignKey: 'usuario_id', as:'usuario' })
 this.belongsTo(models.Beneficio,{ foreignKey: 'beneficios_id', as:'beneficio' })
 this.belongsTo(models.Equipamento,{ foreignKey: 'equipamento_id', as:'equipamento' })

  }
 

}

module.exports = Entrega;

