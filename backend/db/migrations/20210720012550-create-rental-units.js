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
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      city: {
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
        type: Sequelize.DECIMAL(10,0)
      },
      lat: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      lng: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      unitType: {
        allowNull:false,
        type: Sequelize.STRING,
      },
      pool: {
        allowNull:false,
        type: Sequelize.STRING('10')
      },
      price: {
        allowNull:false,
        type: Sequelize.STRING
      },
      rentalUnitDescription: {
        allowNull:false,
        type: Sequelize.TEXT
      },
      totalRentals: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      url: {
        allowNull:false,
        type: Sequelize.TEXT
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
