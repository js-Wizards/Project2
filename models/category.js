module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: DataTypes.STRING
  });
  return Category;
};

db.Category.bulkCreate([
  {name: "Concert"},
  {name: "Movie"},
  {name: "Sports"},
  {name: "Arts & Theatre"}
]).then(() => {
  return Category.findAll();
}).then(categories => {
  console.log(categories)
});