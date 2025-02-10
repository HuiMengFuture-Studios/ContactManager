module.exports = (sequelize, DataTypes) => {
  const MonthlyPlan = sequelize.define("monthlyPlan", {
    month: {
      type: DataTypes.STRING,
      allowNull: false
    },
    goals: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending'
    }
  });

  return MonthlyPlan;
};