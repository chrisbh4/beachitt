'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('RentalUnits', [
     {title:'A little piece of heaven...' , ownerId:2 , city:'Kalapana'  ,state: 'HI'  , zipcode:'95654'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0 , lat: '19.356697', lng:'-154.968307' , unitType: "house"  , pool: 'yes'  , price: '850' , rentalUnitDescription:'Water front house in Kalapana. The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
     {title:'Paradise in Maui' , ownerId:1 , city:'Lahana'  ,state: 'HI'  , zipcode:'78944'  , rooms: 3 , bathrooms: 2, distanceFromBeach: 0,lat:'20.873565', lng:'-156.677427' , unitType: "Apartment"  , pool: 'yes'  , price: '650' , rentalUnitDescription:'Water front house, The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/house-hawaii' , createdAt: new Date() , updatedAt: new Date()},
     {title:'Summer time fun in Miami' , ownerId:2 , city:'Miami'  ,state: 'FL'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0,lat:'25.889033' , lng:'-80.122014' , unitType: "Apartment"  , pool: 'yes'  , price: '450' , rentalUnitDescription:'Water front house, The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-img.jpeg' , createdAt: new Date() , updatedAt: new Date()},
     {title:'Come relax in the amazing city of Santa Barbara' , ownerId:1 , city:'Santa Barbara'  ,state: 'CA'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0,lat:'34.400754', lng:'-119.727812' , unitType: "house"  , pool: 'yes'  , price: '750' , rentalUnitDescription:'Water front house, The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/beach-house-cancun.jpeg' , createdAt: new Date() , updatedAt: new Date()},
     {title:'Family fun in the Flordia islands' , ownerId:1 , city:'Sanibel Island'  ,state: 'FL'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0, lat:'26.443398', lng:'-82.111511' , unitType: "house"  , pool: 'yes'  , price: '550' , rentalUnitDescription:'Water front house, The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/beach-house-malibu.jpeg' , createdAt: new Date() , updatedAt: new Date()},
     {title:'Luxury stay in Laguna beach' , ownerId:2 , city:'Laguna Beach'  ,state: 'CA'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0, lat:'33.541679', lng:'-117.777214', unitType: "house"  , pool: 'yes'  , price: '1200' , rentalUnitDescription:'Water front house, The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/house-caribbean-2.jpeg' , createdAt: new Date() , updatedAt: new Date()},
     {title:'24/7 summer time fun' , ownerId:2 , city:'Outer Banks'  ,state: 'FL'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0, lat:'35.5585', lng:'-75.4665' , unitType: "house"  , pool: 'yes'  , price: '400' , rentalUnitDescription:'Water front house, The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/house-caribbean-3.jpeg' , createdAt: new Date() , updatedAt: new Date()},
     {title:'Luxury house in San Diego ' , ownerId:2 , city:'San Deigo'  ,state: 'CA'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0, lat:'32.7157', lng:'-117.1611' , unitType: "house"  , pool: 'yes'  , price: '950' , rentalUnitDescription:'Water front house, The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/house-caribbean.jpeg' , createdAt: new Date() , updatedAt: new Date()},
     {title:'Tech paradise' , ownerId:2 , city:'San Francisco'  ,state: 'CA'  , zipcode:'78944'  , rooms: 6 , bathrooms: 2, distanceFromBeach: 0,lat:'37.701751', lng:'-122.389313' , unitType: "house"  , pool: 'yes'  , price: '1800' , rentalUnitDescription:'Water front house, The house was completely rebuild and decorated by a famous San Francisco architect. A few walking blocks to great restaurants, winery and distillery. World famous hikes are steps away.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/house-caribean.jpeg' , createdAt: new Date() , updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('RentalUnits', null, {});
  }
};


// 19.356697	-154.968307



/*

Maui : lat:'20.873565', lng:'-156.677427'
Miami : lat:'25.889033' , lng:'-80.122014'
Monterey ca , lat:'36.6002', lng:'-21.898460'
Sanibel Island, FL: lat:'26.443398', lng:'-82.111511'
Laguna beach, CA : lat:'33.541679', lng:'-117.777214'
Outer Banks, FL : lat:'35.5585', lng:'-75.4665'
san diego : lat:'32.7157', lng:'-117.1611'
san francisco : lat:'37.701751', lng:'-122.389313'

8 images
{title:'Paradise in Maui' , ownerId:1 , city:'Lahana'  ,state: 'HI'  , zipcode:'78944'  , rooms: 3 , bathrooms: 2, distanceFromBeach: 0,lat:'20.873565', lng:'-156.677427' , unitType: "Apartment"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-bahamas.jpeg' , createdAt: new Date() , updatedAt: new Date()},
{title:'Summer time fun in Miami' , ownerId:2 , city:'Miami'  ,state: 'FL'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0,lat:'25.889033' , lng:'-80.122014' , unitType: "Apartment"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/apartment-img.jpeg' , createdAt: new Date() , updatedAt: new Date()},
{title:'Come relax in the amazing city of Montery' , ownerId:1 , city:'Montery'  ,state: 'CA'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0,lat:'36.6002', lng:'-21.898460'', unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/beach-house-cancun.jpeg' , createdAt: new Date() , updatedAt: new Date()},
{title:'Family fun in the Flordia islands' , ownerId:1 , city:'Sanibel Island'  ,state: 'FL'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0, lat:'26.443398', lng:'-82.111511' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/beach-house-malibu.jpeg' , createdAt: new Date() , updatedAt: new Date()},
{title:'Luxury stay in Laguna beach' , ownerId:2 , city:'Laguna Beach'  ,state: 'CA'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0, lat:'33.541679', lng:'-117.777214', unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'.'  , totalRentals: 0, url:'s3://beachitt-app/house-caribbean-2.jpeg' , createdAt: new Date() , updatedAt: new Date()},
{title:'24/7 summer time fun' , ownerId:2 , city:'Outer Banks'  ,state: 'FL'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0, lat:'35.5585', lng:'-75.4665' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/house-caribbean-3.jpeg' , createdAt: new Date() , updatedAt: new Date()},
{title:'Luxury house in San Diego ' , ownerId:2 , city:'San Deigo'  ,state: 'CA'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0, lat:'32.7157', lng:'-117.1611' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/house-caribbean.jpeg' , createdAt: new Date() , updatedAt: new Date()},
{title:'Tech paradise' , ownerId:2 , city:'San Francisco'  ,state: 'CA'  , zipcode:'78944'  , rooms: 4 , bathrooms: 2, distanceFromBeach: 0,lat:'37.701751', lng:'-122.389313' , unitType: "house"  , pool: 'yes'  , price: '1,423' , rentalUnitDescription:'.'  , totalRentals: 0, url:'https://beachitt-app.s3.us-west-1.amazonaws.com/house-caribean.jpeg' , createdAt: new Date() , updatedAt: new Date()},


*/
