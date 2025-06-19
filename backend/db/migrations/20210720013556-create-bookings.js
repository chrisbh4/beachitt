'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{model:'Users'}
      },
      startDate: {
        allowNull:false,
        // type: Sequelize.DATEONLY
        type: Sequelize.TEXT
      },
      endDate: {
        allowNull:false,
        // type: Sequelize.DATEONLY
        type: Sequelize.TEXT
      },
      rentalUnitId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{model:'RentalUnits'}
      },
      pricePerNight: {
        allowNull: true,
        type: Sequelize.DECIMAL(10,2)
      },
      totalPrice: {
        allowNull: true,
        type: Sequelize.DECIMAL(10,2)
      },
      numberOfNights: {
        allowNull: true,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Bookings');
  }
};
