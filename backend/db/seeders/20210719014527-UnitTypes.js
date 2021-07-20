'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('UnitTypes', [
     {type:'house', createdAt: new Date(), updatedAt: new Date()},
     {type:'apartment',createdAt: new Date(), updatedAt: new Date()},
     {type:'private room',createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('UnitTypes', null, {});
  }
};
