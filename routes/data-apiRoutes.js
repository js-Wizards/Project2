const db = require("../models");
const axios = require("axios");
const moment = require("moment");


module.exports = function (app) {
  app.get("/api/data/:category", function (request, response) {
    const startDate = moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
    const endDate = moment(startDate).add(1, 'months').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
    //console.log(startDate);
    axios
      .get("https://app.ticketmaster.com/discovery/v2/events.json", {
        params: {
          apikey: "QpgAlmehADBTbnhbCGSGXmv5wqyRcSpo",
          startDateTime: startDate + "Z",
          endDateTime: endDate + "Z",
          city: "Chicago",
          countryCode: "US",
          stateCode: "IL",
          classificationName: request.params.category,
          page: 0
        }
      })
      .then(tmData => {
        let responseData = tmData.data._embedded.events;
        let db_data = [];
        db.Category.findOne({
          where: { name: request.params.category }
        }).then(dbcategory => {
          //console.log(dbcategory.dataValues);
          //loop through response and create new object that will be saved to db
          for (var i = 0; i < responseData.length; i++) {
            let newEvent = {};
            for (let key in responseData[i]) {
              if (key === "name") {
                newEvent.eventName = responseData[i][key]
              } else if (key === "id") {
                newEvent.uuid = responseData[i][key]
              } else if (key === "_embedded") {
                newEvent.venueName = responseData[i][key].venues[0].name
                newEvent.addressLine1 = responseData[i][key].venues[0].address.line1
                newEvent.addressLine2 = responseData[i][key].venues[0].address.line2
                newEvent.city = responseData[i][key].venues[0].city.name
                newEvent.state = responseData[i][key].venues[0].state.stateCode
                newEvent.postalCode = responseData[i][key].venues[0].postalCode
              } else if (key === "dates") {
                newEvent.startDate = responseData[i][key].start.localDate
                newEvent.startTime = responseData[i][key].start.localTime
              }
              newEvent.CategoryId = dbcategory.dataValues.id
            }
            //console.log(newEvent);
            db_data.push(newEvent);
          };
          //console.log(db_data);
          db.Event.bulkCreate(db_data, { ignoreDuplicates: true })
            .then(() => {
              return db.Event.findAll({});
            }).then(events => {
              //console.log(events[0].dataValues)
              response.json(events);
            })
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  })
};
