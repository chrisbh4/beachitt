'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnitType = sequelize.define('UnitType', {
    type: DataTypes.STRING
  }, {});
  UnitType.associate = function(models) {
    // associations can be defined here
    UnitType.belongsTo(models.RentalUnits, {foreignKey:'unitTypeId'})
  };
  return UnitType;
};
