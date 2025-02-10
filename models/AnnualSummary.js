module.exports = (sequelize, DataTypes) => {
  const AnnualSummary = sequelize.define("annualSummary", {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT
    }
  });

  return AnnualSummary;
};