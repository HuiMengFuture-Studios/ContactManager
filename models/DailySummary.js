module.exports = (sequelize, DataTypes) => {
  const DailySummary = sequelize.define("dailySummary", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT
    }
  });

  return DailySummary;
};