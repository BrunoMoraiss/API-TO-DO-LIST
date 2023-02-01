'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('tasks', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pendente'
    })    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tasks', 'status', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
};
