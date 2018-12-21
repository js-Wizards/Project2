module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    eventName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    venueName: DataTypes.TEXT,
    addressLine1: DataTypes.TEXT,
    addressLine2: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    postalCode: DataTypes.INTEGER,
    startData: DataTypes.DATE,
    createdBy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    isUserCreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  Event.associate = function(models) {
    Event.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Event.associate = function(models) {
    Event.belongsToMany(models.User, { through: "SavedEvents" });
  };

  return Event;
};
