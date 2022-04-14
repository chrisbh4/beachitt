'use strict';

const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [3, 30],
    //     isNotEmail(value) {
    //       if (Validator.isEmail(value)) {
    //         throw new Error('Cannot be an email.');
    //       }
    //     },
    //   },
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [3, 30],
    //     isNotEmail(value) {
    //       if (Validator.isEmail(value)) {
    //         throw new Error('Cannot be an email.');
    //       }
    //     },
    //   },
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    // image:{
    //     type: DataTypes.TEXT,
    //     allowNull:true
    //  },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  // User.associate = function(models) {
  //   // associations can be defined here
  //   User.hasMany(models.RentalUnits , {foreignKey: 'id'})
  // };
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };


   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };


   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.RentalUnits , {foreignKey: 'ownerId'})
    User.hasMany(models.Reviews, {foreignKey: 'userId'})
    User.hasMany(models.Bookings, {foreignKey: 'userId'})
  };
  return User;


};


/* I checked my database my references look correct , I thought it
was how the order of my migrations were and maybe that was the fix
but it wasn't the order that mattered. I was looking at some documentation
but most of it seemed out of date and I also looked at the sequelize-cheatsheet.pdf
and the way how the assosiations examples look match with how I have it. I'm pretty
consfued on what the issue could be

*/
