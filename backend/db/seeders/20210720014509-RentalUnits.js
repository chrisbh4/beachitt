'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('RentalUnits', [
     {title:'A little piece of heaven...' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
     {title:'Florida Keys' , ownerId:1 , city:'miami'  ,state: 'FL'  , zipcode:'45455'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'', totalRentals:0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    //  {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '33.905758', lng:'-78.391144' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'A little piece of heaven...' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '27.265862', lng:'-82.552521' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'A little piece of heaven...' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '45.908997', lng:'-123.968475' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '45.908997', lng:'-123.968475' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '27.265862', lng:'-82.552521' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    //  {title:'A little piece of heaven...' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    //  {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '33.905758', lng:'-78.391144' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'A little piece of heaven...' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '27.265862', lng:'-82.552521' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'A little piece of heaven...' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '45.908997', lng:'-123.968475' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '45.908997', lng:'-123.968475' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '27.265862', lng:'-82.552521' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    //  {title:'A little piece of heaven...' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    //  {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '33.905758', lng:'-78.391144' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'A little piece of heaven...' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '27.265862', lng:'-82.552521' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'A little piece of heaven...' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '45.908997', lng:'-123.968475' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'956'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '45.908997', lng:'-123.968475' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    // {title:'' , ownerId:2 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '27.265862', lng:'-82.552521' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
    {title:'' , ownerId:1 , city:'Half Moon Bay'  ,state: 'CA'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '33.905758', lng:'-78.391144' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'Water front house in Half Moon Bay. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away. This is the closest house to Mavericks world famous surf beach.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('RentalUnits', null, {});
  }
};


// 19.356697	-154.968307



/*

Bahamas : lat:'24.985591', lng:'-77.422430'
Miami : lat:'25.889033' , lng:'-80.122014'
Cancun: lat:'21.280737', lng:'-86.823824'
Spain : lat:'41.261808', lng:'1.993486'
Italy : lat:'40.853294', lng:'14.305573'



*/
