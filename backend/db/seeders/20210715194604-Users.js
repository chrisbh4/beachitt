'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        // firstName: "Demo",
        // lastName:"User",
        // image:"image",
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'Lbj@23.LA',
        username: 'theking',
        // firstName:"Lebron",
        // lastName:"James",
        // image:"image",
        hashedPassword: bcrypt.hashSync('king'),
      },
      {
        email: 'Dwade@WadeCounty.Heat',
        username: 'dwade',
        // firstName:"Dwayne",
        // lastName:"Wade",
        // image:"image",
        hashedPassword: bcrypt.hashSync('dwade'),
      },
      {
        email: faker.internet.email(),
        username: 'jordan',
        // firstName: "Michael",
        // lastName:"Jordan",
        // image:"image",
        hashedPassword: bcrypt.hashSync('thegoat'),
      },
      {
        email: faker.internet.email(),
        username: 'kb23',
        // firstName:"Kobe",
        // lastName:"Bryant",
        // image:"image",
        hashedPassword: bcrypt.hashSync('kobe'),
      },
      {
        email: 'chris@chris.com',
        username: 'chris',
        // firstName:"Chris",
        // lastName:"Brown",
        // image:"image",
        hashedPassword: bcrypt.hashSync('password'),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
