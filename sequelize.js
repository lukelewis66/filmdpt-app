const { Sequelize } = require("sequelize");
const UserModel = require("./models/user");
const ItemModel = require("./models/item");
const ReservationModel = require("./models/reservation");
const config = require("./dbconfig");
const db = config.database;

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: "mysql",
});

try {
  sequelize.authenticate().then(() => console.log("connection successful"));
} catch (error) {
  console.error("Unable to connect to database:", error);
}

const Item = ItemModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Reservation = ReservationModel(sequelize, Sequelize);

//if borrowed, each item will have a foreign key associated with the reservation
Reservation.hasMany(Item);
Item.belongsTo(Reservation);
//each reservation will have a foreign key associated with the user borrowing the items
Reservation.belongsTo(User);

sequelize
  .sync({ alter: true })
  .then(() => console.log("all tables synced"))
  .catch((error) => console.log(error));

module.exports = { Item, User, Reservation };
