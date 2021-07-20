'use strict';
module.exports = (sequelize, DataTypes) => {
  const RentalUnits = sequelize.define('RentalUnits', {
    title: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    rooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    distanceFromBeach: DataTypes.INTEGER,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    unitTypeId: DataTypes.INTEGER,
    pool: DataTypes.BOOLEAN,
    price: DataTypes.DECIMAL,
    rentalUnitDescription: DataTypes.STRING,
    totalRentals:  {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  }, {});
  RentalUnits.associate = function(models) {
    // associations can be defined here
  };
  return RentalUnits;
};
