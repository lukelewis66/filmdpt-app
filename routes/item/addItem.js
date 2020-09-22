const Model = require("../../sequelize");
const Item = Model.Item;

module.exports = (app) => {
  console.log("hi");
  app.post("/addItem", (req, res, next) => {
    console.log("addItem: ", req.body);
    form = req.body.form;
    Item.create({
      name: form.name,
      level: form.level,
      status: form.status,
    }).then(() => {
      console.log("Item added");
      res.status(200).send({
        message: "Item added",
      });
    });
  });
};
