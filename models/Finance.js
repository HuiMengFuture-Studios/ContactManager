module.exports = (sequelize, DataTypes) => {
  const Finance = sequelize.define("finance", {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('income', 'expense'),
      defaultValue: 'expense'
    }
  });

  return Finance;
};