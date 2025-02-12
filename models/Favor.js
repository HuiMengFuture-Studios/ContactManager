module.exports = (sequelize, DataTypes) => {
  const Favor = sequelize.define("favor", {
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contacts',
        key: 'id'
      }
    },
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
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending'
    },
    isReturned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dueDate: { // 新增字段：借款截止时间
      type: DataTypes.DATE,
      allowNull: false
    },
    repaymentAttitude: { // 新增字段：还款态度
      type: DataTypes.ENUM('good', 'bad'),
      allowNull: true
    }
  });

  return Favor;
};
