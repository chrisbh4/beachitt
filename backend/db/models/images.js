'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Images', {
    rentalUnitId: DataTypes.INTEGER,
    url: DataTypes.TEXT
  }, {});
  Images.associate = function(models) {
    // associations can be defined here
    Images.belongsTo(models.RentalUnits, {foreignKey:'rentalUnitId'})

  };
  return Images;
};
