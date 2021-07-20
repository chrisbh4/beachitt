'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('RentalUnits', [{
     
   }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('RentalUnits', null, {});
  }
};
