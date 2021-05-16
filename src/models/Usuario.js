
const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init({
      nome:DataTypes.STRING,
      email:DataTypes.STRING,
      senha:DataTypes.STRING,
      telefone:DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["A", "I", "E"]
      },
    }, {
      sequelize
    });
  };


  static associate(models){
     this.belongsTo(models.Equipamento,{ foreignKey: 'equipamento_id', as:'equipamento' })
     this.belongsToMany(models.Permissoe, { foreignKey: 'usuario_id', through: 'usuarios_permissoes', as: 'permissoes' });
     this.hasMany(models.Pessoa,{ foreignKey: 'usuario_id', as:'pessoas' }) 
     this.hasMany(models.Entrega,{ foreignKey: 'usuario_id', as:'entregas' }) 
    }
 

}

module.exports = Usuario;



