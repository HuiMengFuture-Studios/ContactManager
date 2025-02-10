module.exports = (sequelize, DataTypes) => {
  const MonthlySummary = sequelize.define("monthlySummary", {
    month: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT
    }
  });

  return MonthlySummary;
};