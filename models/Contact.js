module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("contact", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    creditScore: {
      type: DataTypes.FLOAT,
      defaultValue: 100
    },
    source: { // 新增字段：认识渠道/途径
      type: DataTypes.STRING
    },
    relationship: { // 新增字段：关系
      type: DataTypes.STRING
    }
  });

  return Contact;
};
