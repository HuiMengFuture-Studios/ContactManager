module.exports = (sequelize, DataTypes) => {
  const MediaList = sequelize.define("mediaList", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('movie', 'book'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending'
    }
  });

  return MediaList;
};