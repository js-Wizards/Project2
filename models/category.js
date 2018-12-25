var db = require("../models");

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  });

  Category.associate = function(models) {
    Category.hasMany(models.Event);
  };

  return Category;
};

// db.Category.bulkCreate([
//   {name: "Concert"},
//   {name: "Movie"},
//   {name: "Sports"},
//   {name: "Arts & Theatre"}
// ]).then(() => {
//   return Category.findAll();
// }).then(categories => {
//   console.log(categories)
// });
