'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    rentalUnitId: DataTypes.INTEGER
  }, {});
  Bookings.associate = function(models) {
    // associations can be defined here
    Bookings.belongsTo(models.User, {foreignKey: 'userId'})
    Bookings.belongsTo(models.RentalUnits, {foreignKey: "rentalUnitId"})
  };
  return Bookings;
};
