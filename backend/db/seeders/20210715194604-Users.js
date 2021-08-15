'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }
      // {
      //   email: 'Lbj@23.LA',
      //   username: 'theking',
      //   hashedPassword: bcrypt.hashSync('king'),
      // },
      // {
      //   email: 'Dwade@WadeCounty.Heat',
      //   username: 'dwade',
      //   hashedPassword: bcrypt.hashSync('dwade'),
      // },
      // {
      //   email: faker.internet.email(),
      //   username: 'jordan',
      //   hashedPassword: bcrypt.hashSync('thegoat'),
      // },
      // {
      //   email: faker.internet.email(),
      //   username: 'kb23',
      //   hashedPassword: bcrypt.hashSync('kobe'),
      // },
      // {
      //   email: 'chris@chris.com',
      //   username: 'chris',
      //   hashedPassword: bcrypt.hashSync('password'),
      // }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
