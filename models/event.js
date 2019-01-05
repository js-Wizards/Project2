module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    eventName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    venueName: DataTypes.TEXT,
    addressLine1: DataTypes.TEXT,
    addressLine2: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    postalCode: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    startTime: DataTypes.TIME,
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
    Event.belongsToMany(models.User, { through: models.SavedEvent });
  };

  return Event;
};
