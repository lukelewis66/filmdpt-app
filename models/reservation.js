module.exports = (sequelize, type) => {
  return sequelize.define(
    "reservation",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: type.STRING,
        allowNull: false,
      },
      borrow_date: {
        type: type.DATE,
        allowNull: false,
      },
      return_date: {
        type: type.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "Reservations",
    }
  );
};
