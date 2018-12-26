const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {
  app.delete("/api/events", function (request, response) {
    db.Event.destroy({
      where: {
        id: {
          [Op.gte]: 1
        },
        isUserCreated: {
          [Op.eq]: 0
        }
      },
      order: [
        ["startDate", "ASC"],
        ["startTime","ASC"]
      ]
    })
      .then(deletedData => {
        console.log(deletedData);
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

  //GET route for getting all of the events
  // app.get("/api/events/:category", function (request, response) {
  //   db.Category.findOne({
  //     where: { name: request.params.category }
  //   }).then(dbcategory => {
  //     db.Event.findAll({
  //       where: { CategoryId: dbcategory.id }
  //     }).then(function (dbEvent) {
  //       response.json(dbEvent);
  //     });
  //   });
  // });

  // app.get("/api/events/:category", function (request, response) {
  //   db.Event.findAll({
  //     include: [{
  //       model: db.Category,
  //       where: {
  //         name: request.params.category
  //       }
  //     }]
  //   }).then(function (dbEvent) {
  //     response.json(dbEvent);
  //   });
  // });

  app.get("/api/events/:category", function (request, response) {
    db.Category.findAll({ 
      where: {
        name: request.params.category
      },     
      include: [ db.Event ] 
    }).then(function (dbEvent) {
      response.json(dbEvent);
    });
  });

}
