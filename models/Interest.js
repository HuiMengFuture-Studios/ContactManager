module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define("interest", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('hobby', 'food'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  });

  return Interest;
};