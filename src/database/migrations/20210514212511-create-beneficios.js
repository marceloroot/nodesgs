'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('beneficios', { 
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
      descricao: {
          type: Sequelize.STRING(300),
         
      },
      categoria: {
          type: Sequelize.STRING(200),
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
    await queryInterface.dropTable('beneficios');
  }
};
