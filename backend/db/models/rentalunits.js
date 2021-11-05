'use strict';
module.exports = (sequelize, DataTypes) => {
  const RentalUnits = sequelize.define('RentalUnits', {
    title: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    rooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    distanceFromBeach: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    unitType: DataTypes.STRING,
    pool: DataTypes.STRING,
    price: DataTypes.STRING,
    rentalUnitDescription: DataTypes.TEXT,
    totalRentals:  {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  }, {});
  RentalUnits.associate = function(models) {
    // associations can be defined here

    RentalUnits.belongsTo(models.User , {foreignKey: 'ownerId'})
    RentalUnits.hasMany(models.Images, {foreignKey: 'rentalUnitId'})
    RentalUnits.hasMany(models.Reviews,{foreignKey:'rentalUnitId'})
  };
  return RentalUnits;
};
