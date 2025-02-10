module.exports = (sequelize, DataTypes) => {
  const DailyPlan = sequelize.define("dailyPlan", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tasks: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending'
    }
  });

  return DailyPlan;
};