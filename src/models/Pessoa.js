
const { Model, DataTypes } = require('sequelize');

class Pessoa extends Model {
  static init(sequelize) {
    super.init({
    nome:DataTypes.STRING,
    cpf:DataTypes.STRING,
    sexo:DataTypes.STRING,
    telefone:DataTypes.STRING,
    dataNascimento:DataTypes.DATE,
    rg:DataTypes.STRING,
    escolaridade:DataTypes.STRING,
    estadoCivil:{
      type: DataTypes.ENUM,
      values: ["Solteiro(a)", "Casado(a)", "Divorciado(a)","Viuvo(a)"]
    },
    renda:DataTypes.DECIMAL,
    ctpsAssinada:{
      type: DataTypes.ENUM,
      values: ["S","N"]
    },
    ppcl:{
      type: DataTypes.ENUM,
      values: ["S","N"]
    },
    observacao:DataTypes.STRING,
    observacaoRestrita:DataTypes.STRING,
    cep:DataTypes.STRING,
    logradouro:DataTypes.STRING,
    complemento:DataTypes.STRING,
    bairro:DataTypes.STRING,
    localidade:DataTypes.STRING,
    numero:DataTypes.STRING,
    uf:DataTypes.STRING,

    status: {
      type: DataTypes.ENUM,
      values: ["A", "I", "E"]
    },
   
    
    }, {
      sequelize
    });
  };


  static associate(models){
   this.belongsTo(models.Pessoa,{ foreignKey: 'familiar_id', as:'pessoa' })
   this.hasMany(models.Pessoa,{ foreignKey: 'familiar_id', as:'familiares' }) 
   //FIm loop de ligacao
   this.belongsTo(models.Usuario,{ foreignKey: 'usuario_id', as:'usuario' })
   this.belongsToMany(models.Beneficio, { foreignKey: 'pessoas_id', through: 'pessoas_beneficios', as: 'beneficios' });
  //Entrega 
  this.hasMany(models.Entrega,{ foreignKey: 'pessoas_id', as:'entregas' }) 
  }
 

}

module.exports = Pessoa;


