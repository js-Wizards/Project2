module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    venueName: DataTypes.TEXT,
    description: DataTypes.TEXT
  });
  return Example;
};
