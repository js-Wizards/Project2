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
