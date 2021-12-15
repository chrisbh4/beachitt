'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Bookings', [
     {userId:1, startDate:"test date", endDate:"test date", rentalUnitId:1,createdAt: new Date() , updatedAt: new Date() },
     {userId:1, startDate:"12-20-2021", endDate:"12-20-2021", rentalUnitId:1,createdAt: new Date() , updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Bookings', null, {});
  }
};


/*

* Backend
  -"GET" get all bookings for Single Rental Unit
    - Need to include Bookings when that Single Unit gets loaded from its API

  - "POST"
    - Need the User's ID , Unit.Id to be able to identify who it belongs too
    - create new booking on booking of the backend

  - "PUT"





*/
