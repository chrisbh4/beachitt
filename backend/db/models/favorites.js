'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    rentalUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'RentalUnits',
        key: 'id'
      }
    }
  }, {});
  
  Favorites.associate = function(models) {
    // associations can be defined here
    Favorites.belongsTo(models.User, { foreignKey: 'userId' });
    Favorites.belongsTo(models.RentalUnits, { foreignKey: 'rentalUnitId' });
  };
  
  return Favorites;
}; 