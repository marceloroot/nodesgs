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
      responsavel: {
          type: Sequelize.STRING(200),
      },
      sobre: {
          type: Sequelize.STRING(200),
      },
      observacao: {
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
    await queryInterface.dropTable('equipamentos');
  }
};
