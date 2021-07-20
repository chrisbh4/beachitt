'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RentalUnits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      ownerId: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      address: {
        allowNull:false,
        type: Sequelize.STRING(40)
      },
      state: {
        allowNull:false,
        type: Sequelize.STRING(2)
      },
      zipcode: {
        type: Sequelize.INTEGER
      },
      rooms: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      bathrooms: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      distanceFromBeach: {
        allowNull:false,
        type: Sequelize.DECIMAL(2,2)
      },
      lat: {
        allowNull:false,
        type: Sequelize.DECIMAL
      },
      lng: {
        allowNull:false,
        type: Sequelize.DECIMAL
      },
      unitTypeId: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      pool: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      price: {
        allowNull:false,
        type: Sequelize.DECIMAL(5,2)
      },
      rentalUnitDescription: {
        allowNull:false,
        type: Sequelize.STRING
      },
      totalRentals: {
        allowNull:false,
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
    return queryInterface.dropTable('RentalUnits');
  }
};
