'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pessoas', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      familiar_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{ model:'pessoas', key:'id' },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
     
      nome: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      cpf: {
          type: Sequelize.STRING(300),
          allowNull: false,
      },
      sexo: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(200),
      },
      dataNascimento: {
        type: Sequelize.DATE,
      },
      rg: {
        type: Sequelize.STRING(200),
      },
      escolaridade: {
        type: Sequelize.STRING(200),
      },
      
      estadoCivil: {
        type: Sequelize.ENUM("Solteiro(a)", "Casado(a)", "Divorciado(a)","Viuvo(a)"),
        defaultValue: "Solteiro(a)",
      },
      renda: {
        type: Sequelize.DECIMAL,
      },
      ctpsAssinada: {
        type: Sequelize.ENUM("S","N"),
        defaultValue: "S",
      },
      ppcl: {
        type: Sequelize.ENUM("S","N"),
        defaultValue: "S",
      },
      
      observacao: {
        type: Sequelize.STRING,
      },
      observacaoRestrita: {
        type: Sequelize.STRING,
      },
      cep:{
        type: Sequelize.STRING(9),
      },
      logradouro: {
          type: Sequelize.STRING(200),
      },
      complemento: {
          type: Sequelize.STRING(200),
      },
      bairro: {
          type: Sequelize.STRING(200),
      },
      localidade: {
        type: Sequelize.STRING(200),
      },
      numero: {
          type: Sequelize.STRING(100),
      },
      uf: {
          type: Sequelize.STRING(2),
    },
      status: {
        type: Sequelize.ENUM("A", "I", "E"),
        defaultValue: "A",
      },
    
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }, 
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }, 
      

   });
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pessoas');
  }
};
