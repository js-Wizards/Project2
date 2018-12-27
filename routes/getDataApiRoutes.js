var axios = require("axios");
var db = require("../models");

module.exports = function (app) {
    app.get("/api/loaddata/:category", function (req, res) {
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
                // console.log(req.params.category);
                // console.log(response.data);
                let responseData = response.data._embedded.events;
                // console.log(responseData);
                let db_data = [];
                //loop through response and create new object that will be saved to db
                for (var i = 0; i < responseData.length; i++) {
                    let newEvent = {};
                    for (let key in responseData[i]) {
                        if (key === "name") {
                            newEvent.eventName = responseData[i][key]
                            //console.log(responseData[i][key])
                        }
                        if (key === "_embedded") {
                            newEvent.venueName = responseData[i][key].venues[0].name
                            newEvent.addressLine1 = responseData[i][key].venues[0].address.line1
                            newEvent.addressLine2 = responseData[i][key].venues[0].address.line2
                            newEvent.city = responseData[i][key].venues[0].city.name
                            newEvent.state = responseData[i][key].venues[0].state.stateCode
                            newEvent.postalCode = responseData[i][key].venues[0].postalCode
                            //console.log(responseData[i][key])
                        }
                    };
                    //console.log(newEvent);
                    db_data.push(newEvent);
                    
                };
                console.log(db_data);
                // console.log(db_data[0]);
                // db.Event.create(req.body).then(function (dbExample) {
                //   res.json(dbExample);
                // })

                //console.log(JSON.stringify(response.data, null, " "));
                // res.json(response.data._embedded.events.slice(0, 3));
                // res.render("admin", db_data[0]);

        
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};