const Model = require("../../sequelize");
const Item = Model.Item;

module.exports = (app) => {
  console.log("hi");
  app.get("/getItems", (req, res, next) => {
    form = req.body.form;
    Item.findAll({}).then((items) => {
      console.log("Item added");
      res.status(200).send({
        items: items,
      });
    });
  });
};
