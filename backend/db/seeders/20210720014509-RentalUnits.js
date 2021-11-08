'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('RentalUnits', [
    {title:'A little piece of heaven...' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '37.458547', lng:'-122.444338' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'this is an image seed' , createdAt: new Date() , updatedAt: new Date()},
    { title: 'Summerwind Cottage - Sunsets over the Bay', ownerId:2 , city: 'Vallejo' ,state:'CA'  , zipcode:'94736'  , rooms:2  , bathrooms:1 , distanceFromBeach: 0.2 , lat:'38.09998264736481' , lng:'-122.25585937500001' , unitType: "house" , pool: 'no' , price:'350.00'  , rentalUnitDescription:'Enjoy your time on the water at Summerwind. A refreshing, clean, and luxurious cottage providing all of your needs for a relaxing stay.'  , totalRentals: 0, url:"this is an image seed" , createdAt: new Date() , updatedAt: new Date() }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('RentalUnits', null, {});
  }
};
