'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('RentalUnits', 'distanceFromBeach', {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('RentalUnits', 'distanceFromBeach', {
      type: Sequelize.DECIMAL(10, 0),
      allowNull: false
    });
  }
};
