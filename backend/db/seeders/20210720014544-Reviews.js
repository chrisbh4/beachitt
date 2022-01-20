'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
    {comment:"test seed", rentalUnitId:1,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:2,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:3,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:4,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:5,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:6,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    {comment:"test seed", rentalUnitId:1,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:2,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:3,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:4,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:5,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:6,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:6,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:6,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    {comment:"test seed", rentalUnitId:1,userId:2,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:2,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:3,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:4,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:5,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:6,userId:2,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    {comment:"test seed", rentalUnitId:1,userId:2,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:2,userId:2,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:3,userId:2,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:4,userId:2,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:5,userId:2,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    // {comment:"test seed", rentalUnitId:6,userId:2,username:"demo",createdAt: new Date() , updatedAt: new Date() },
    {comment:"test seed", rentalUnitId:1,userId:1,username:"demo",createdAt: new Date() , updatedAt: new Date() }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
