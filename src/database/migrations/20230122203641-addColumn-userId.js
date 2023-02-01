'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('tasks', 'userId' ,{ 
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.removeColumn('tasks', 'userId')
  }
};
