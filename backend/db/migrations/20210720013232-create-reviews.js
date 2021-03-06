'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comment: {
        allowNull:false,
        type: Sequelize.STRING(250)
      },
      rentalUnitId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{model:'RentalUnits'}
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{model:'Users'}
      },
      username: {
        allowNull:false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
