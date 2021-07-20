'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        fullname: 'DemoUser',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        fullname: 'Faker One',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        fullname:'Faker Two',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'Lbj@23.LA',
        fullname:'Lebron James',
        username: 'theking',
        hashedPassword: bcrypt.hashSync('king'),
      },
      {
        email: 'Dwade@WadeCounty.Heat',
        fullname:'Dwayne Wade',
        username: 'dwade',
        hashedPassword: bcrypt.hashSync('dwade'),
      },
      {
        email: faker.internet.email(),
        fullname:'Michael Jordan',
        username: 'jordan',
        hashedPassword: bcrypt.hashSync('thegoat'),
      },
      {
        email: faker.internet.email(),
        fullname:'Kobe Bryant',
        username: 'kb23',
        hashedPassword: bcrypt.hashSync('kobe'),
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
