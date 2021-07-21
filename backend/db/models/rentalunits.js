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
    unitTypeId: DataTypes.INTEGER,
    pool: DataTypes.BOOLEAN,
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
    //! what is this error Error:
          //* RentalUnits.belongsTo called with something that's not a subclass of Sequelize.Model
    // RentalUnits.belongsTo(models.Users , {foreignKey: 'id'})
    RentalUnits.hasOne(models.UnitType , {foreignKey: 'unitTypeId'})
  };
  return RentalUnits;
};
