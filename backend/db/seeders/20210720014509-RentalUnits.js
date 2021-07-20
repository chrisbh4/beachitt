'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('RentalUnits', [
    {title:'A little piece of heaven...' , ownerId: 1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '37.458547', lng:'-122.444338' , unitTypeId: 1  , pool: true  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated'  , totalRentals: 0 , createdAt: new Date() , updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('RentalUnits', null, {});
  }
};
