'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Bookings', [
     {userId:1, startDate:"2022-11-20", endDate:"2022-11-20", rentalUnitId:1, pricePerNight: 650.00, totalPrice: 650.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:1, startDate:"2022-12-20", endDate:"2022-12-20", rentalUnitId:1, pricePerNight: 650.00, totalPrice: 650.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:1, startDate:"2023-11-02", endDate:"2023-11-20", rentalUnitId:1, pricePerNight: 650.00, totalPrice: 11700.00, numberOfNights: 18, createdAt: new Date() , updatedAt: new Date() },
     {userId:2, startDate:"2022-11-20", endDate:"2022-11-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:3, startDate:"2022-11-20", endDate:"2022-11-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:4, startDate:"2022-11-20", endDate:"2022-11-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:5, startDate:"2022-11-20", endDate:"2022-11-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:6, startDate:"2022-11-20", endDate:"2022-11-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:2, startDate:"2022-12-20", endDate:"2022-12-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:3, startDate:"2022-12-20", endDate:"2022-12-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:4, startDate:"2022-12-20", endDate:"2022-12-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:5, startDate:"2022-12-20", endDate:"2022-12-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:6, startDate:"2022-12-20", endDate:"2022-12-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 850.00, numberOfNights: 1, createdAt: new Date() , updatedAt: new Date() },
     {userId:2, startDate:"2023-11-02", endDate:"2023-11-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 15300.00, numberOfNights: 18, createdAt: new Date() , updatedAt: new Date() },
     {userId:3, startDate:"2023-11-02", endDate:"2023-11-20", rentalUnitId:1, pricePerNight: 650.00, totalPrice: 11700.00, numberOfNights: 18, createdAt: new Date() , updatedAt: new Date() },
     {userId:4, startDate:"2023-11-02", endDate:"2023-11-20", rentalUnitId:1, pricePerNight: 650.00, totalPrice: 11700.00, numberOfNights: 18, createdAt: new Date() , updatedAt: new Date() },
     {userId:5, startDate:"2023-11-02", endDate:"2023-11-20", rentalUnitId:2, pricePerNight: 850.00, totalPrice: 15300.00, numberOfNights: 18, createdAt: new Date() , updatedAt: new Date() },
     {userId:6, startDate:"2023-11-02", endDate:"2023-11-20", rentalUnitId:1, pricePerNight: 650.00, totalPrice: 11700.00, numberOfNights: 18, createdAt: new Date() , updatedAt: new Date() }
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
