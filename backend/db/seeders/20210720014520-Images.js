'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
     {rentalUnitId:1, url:'https://a0.muscache.com/im/pictures/b06531ef-054d-41f9-8f18-a0d5d7c3f696.jpg?im_w=1200', createdAt: new Date(), updatedAt: new Date()},
     {rentalUnitId:2, url:'https://a0.muscache.com/im/pictures/5ebd66f1-2321-4db6-8dcb-82afd00e1544.jpg?im_w=720',createdAt: new Date(), updatedAt: new Date() }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
