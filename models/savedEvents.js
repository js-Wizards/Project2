module.exports = function(sequelize, DataTypes) {
  var SavedEvent = sequelize.define("SavedEvent", {
    EventUuid: {
      type: DataTypes.UUID
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  });

  return SavedEvent;
};
