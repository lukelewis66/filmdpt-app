module.exports = (sequelize, type) => {
  return sequelize.define(
    "item",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: type.STRING,
        allowNull: false,
      },
      level: {
        type: type.INTEGER,
        allowNull: false,
      },
      status: {
        type: type.STRING,
        allowNull: false,
      },
      return_date: type.DATE,
    },
    {
      tableName: "Film_Gear",
    }
  );
};
