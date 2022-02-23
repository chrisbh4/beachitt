'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:1,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:2,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:3,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:4,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:5,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:6,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:7,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:8,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"One of the most relaxing stays our family has ever had!", rentalUnitId:9,userId:2,username:"James Family",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:1,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:2,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:3,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:4,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:5,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:6,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:7,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:8,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"if the defintion of paradise had a picture this would be it. ", rentalUnitId:9,userId:2,username:"The Bryants",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:1,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:2,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:3,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:4,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:5,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:6,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:7,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:8,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"Perfect place to come to after a long season of work.", rentalUnitId:9,userId:2,username:"The Melos",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:1,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:2,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:3,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:4,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:5,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:6,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:7,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:8,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"The best places to just escape and relax from the outside world. ", rentalUnitId:9,userId:2,username:"The Jordans",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:1,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:2,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:3,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:4,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:5,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:6,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:7,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:8,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() },
    {comment:"My dream is to live here forever after I retire.", rentalUnitId:9,userId:2,username:"The Pauls",createdAt: new Date() , updatedAt: new Date() }
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
