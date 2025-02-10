module.exports = (sequelize, DataTypes) => {
  const AnnualPlan = sequelize.define("annualPlan", {
    year: {
      type: DataTypes.INTEGER,
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

  return AnnualPlan;
};