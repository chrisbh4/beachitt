'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    comment: DataTypes.STRING,
    // rating: DataTypes.INTEGER,
    rentalUnitId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {});
  Reviews.associate = function(models) {
    // associations can be defined here
    Reviews.belongsTo(models.User, {foreignKey:'userId'})
    Reviews.belongsTo(models.RentalUnits, {foreignKey:'rentalUnitId'})
  };
  return Reviews;
};
