'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipamentos', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
     
      nome: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      responsavel: {
          type: Sequelize.STRING(200),
      },
      sobre: {
          type: Sequelize.STRING(200),
      },
      observacao: {
        type: Sequelize.STRING(200),
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
    await queryInterface.dropTable('equipamentos');
  }
};
