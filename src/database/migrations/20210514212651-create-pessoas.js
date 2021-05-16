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
      endereco_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{ model:'enderecos', key:'id' },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
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
        type: Sequelize.ENUM(["Solteiro(a)", "Casado(a)", "Divorciado(a)","Viuvo(a)"]),
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
