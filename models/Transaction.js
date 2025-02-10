module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transaction", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending'
    }
  });

  return Transaction;
};