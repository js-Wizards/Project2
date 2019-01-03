const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

module.exports = function (app) {
  app.delete("/api/events", function (request, response) {
    let date = moment().format("YYYY-MM-DD");
    db.Event.destroy({
      where: {
        uuid: {
          [Op.gt]: 'A'
        },
        isUserCreated: {
          [Op.eq]: 0
        },
        startDate: {
          [Op.lt]: date
        }
      }
    })
      .then(deletedData => {
        response.json(deletedData);
      });
  });

  app.delete("/api/events/:id", function (request, response) {
    db.Event.destroy({
      where: {
        id: request.params.id
      }
    })
      .then(function (deletedData) {
        response.json(deletedData);
      });
  });

  //GET route for getting all of the public events by category
  app.get("/api/events/:category", function (request, response) {
    db.Category.findAll({
      where: {
        name: request.params.category
      },
      include: [{
        model: db.Event,
        where: {
          isUserCreated: 0
        },
        required: true,
      }],
      order: [
        [db.Event, "startDate", "ASC"],
        [db.Event, "startTime", "ASC"]
      ]
    }).then(function (dbEvent) {
      response.json(dbEvent);
    });
  });

  //GET route for getting all of the public events
  app.get("/api/events/", function (request, response) {
    db.Event.findAll({
      where: {
        isUserCreated: 0
      },
      order: [
        ["startDate", "ASC"],
        ["startTime", "ASC"]
      ]
    }).then(function (dbEvent) {
      response.json(dbEvent);
    });
  });

  // POST route for saving a new user event
  app.post("/api/events", function (request, response) {
    console.log(request.body);
    db.Event.create({
      eventName: request.body.eventName,
      venueName: request.body.venueName,
      addressLine1: request.body.addressLine1,
      addressLine2: request.body.addressLine2,
      city: request.body.city,
      state: request.body.state,
      postalCode: request.body.postalCode,
      startDate: request.body.startDate,
      startTime: request.body.startTime,
      createdBy: request.body.createdBy,
      isUserCreated: 1
    })
      .then(function (dbUserEvent) {
        console.log(dbUserEvent)
        db.Event.findOne({
          where: {
            eventId: dbUserEvent.eventId
          }
        })
          .then(function (newEvent) {
            console.log(newEvent);
            console.log("This is after the find")
            db.SavedEvents.create({
              EventUuid: newEvent.uuid,
              UserId: request.body.createdBy
            })
            .then(function(dbSavedEvent){
              console.log(dbSavedEvent);
            })
          })
        //response.json(dbUserEvent);
      })
  });
}
