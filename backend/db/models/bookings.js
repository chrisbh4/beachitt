'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    rentalUnitId: DataTypes.INTEGER,
    pricePerNight: DataTypes.DECIMAL(10, 2),
    totalPrice: DataTypes.DECIMAL(10, 2),
    numberOfNights: DataTypes.INTEGER
  }, {});
  Bookings.associate = function(models) {
    // associations can be defined here
    Bookings.belongsTo(models.User, {foreignKey:'userId'})
    Bookings.belongsTo(models.RentalUnits, {foreignKey:"rentalUnitId"})
  };
  return Bookings;
};
