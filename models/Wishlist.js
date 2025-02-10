module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("wishlist", {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    }
  });

  return Wishlist;
};