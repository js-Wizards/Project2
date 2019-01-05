var db = require("../models");
var axios = require("axios");
var ticketmaster = require("../modules/ticketmaster")

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  

  app.get("/admin/:category", function(req, res) {
    ticketmaster.getByCatetory(req.params.category)
    .then((dbData) => {
      let eventIdArray = [];
      console.log("ticketmaster");
      //todo: save to database
      db.Event.findAll()
      .then(function(results) {
        console.log(results.eventid);

        for(i=0; i < results.length; i++) {
          let = id = results[i].eventid;
          eventIdArray.push(id);
          // console.log(results[i].eventid);
        }
        // console.log(eventIdArray);
        let dbDataFiltered = dbData.filter(event => {
          return eventIdArray.indexOf(event.id) == -1;
        })

        db.Event.bulkCreate(dbDataFiltered)
        .then(bulkData => {
          res.render("admin", {category: req.params.category, eventsDB: bulkData, eventsAPI: dbData})
        })
        // console.log(dbDataFiltered);
      })
      // get event.id's from database and put them into an array called eventIds ["vv1A7ZAf4Gkdbtp", "vv1A7ZAf4Gkdbtp"]
      // filter dbData to just the ones that are NOT already in db
      // let dbDataFiltered = dbData.filter(event => {
        // return eventIds.indexOf(event.id) == -1;
      //})

      // db.Event.bulkCreate(dbDataFiltered)
      // .then((bulkData) => {
      //   res.render("admin", {category: req.params.category, events: bulkData})
      // })


      // db.Event.bulkCreate(dbDataFiltered)
      // .then((bulkData) => {
      //   res.render("admin", {category: req.params.category, eventsDB: bulkData, eventsAPI: dbData})
      // })



      // res.render("admin", {category: req.params.category, events: dbData})
    })
    
    // res.render("admin", db_data);

  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};



/*

axios
            .get("https://app.ticketmaster.com/discovery/v2/events.json", {
                params: {
                    apikey: "QpgAlmehADBTbnhbCGSGXmv5wqyRcSpo",
                    startDateTime: "2018-12-22T00:00:00Z",
                    endDateTime: "2019-12-22T23:59:00Z",
                    city: "Chicago",
                    countryCode: "US",
                    stateCode: "IL",
                    classificationName: req.params.category,
                    page: 0
                }
            })
            .then(function (response) {
                let responseData = response.data._embedded.events;
                let dbData = responseData.map(event => {
                  return {
                    name: event.name,
                    id: event.id,
                    url: event.url,
                    startDate: event.dates.start.localDate,
                    venueName: event._embedded.venues[0].name,
                    address: event._embedded.venues[0].address.line1,
                    city: event._embedded.venues[0].city.name,
                    state: event._embedded.venues[0].state.stateCode,
                    zip: event._embedded.venues[0].postalCode,
                  }
                });
                console.log(dbData);
                res.render("admin", { category: req.params.category, events: dbData});
        
            })
            .catch(function (error) {
                console.log(error);
            });

*/

