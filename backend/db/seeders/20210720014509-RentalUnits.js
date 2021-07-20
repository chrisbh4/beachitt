'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('RentalUnits', [{
     name: 'John Doe',
     isBetaMember: false
   }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('RentalUnits', null, {});
  }
};
