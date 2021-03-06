const axios = require("axios");
const moment = require("moment");
const db = require("../models");


const ticketmaster = {
    getByCategory: function (category) {
        const startDate = moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        const endDate = moment(startDate).add(1, 'months').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        return axios.get("https://app.ticketmaster.com/discovery/v2/events.json", {
            params: {
                apikey: "QpgAlmehADBTbnhbCGSGXmv5wqyRcSpo",
                startDateTime: startDate + "Z",
                endDateTime: endDate + "Z",
                city: "Chicago",
                countryCode: "US",
                stateCode: "IL",
                classificationName: category,
                page: 0
            }
        })
            .then(tmData => {
                let db_data = db.Category.findOne({
                    where: { name: category }
                })
                    .then(dbCategory => {
                        //console.log("dbCategory", dbCategory);
                        let responseData = tmData.data._embedded.events;
                        //console.log(dbcategory);
                        // let responseData = response.data._embedded.events;
                        let dbData = responseData.map(event => {
                            return {
                                eventName: event.name,
                                eventid: event.id,
                                venueName: event._embedded.venues[0].name,
                                addressLine1: event._embedded.venues[0].address.line1,
                                addressLine2: event._embedded.venues[0].address.line2,
                                city: event._embedded.venues[0].city.name,
                                state: event._embedded.venues[0].state.stateCode,
                                postalCode: event._embedded.venues[0].postalCode,
                                // id: event.id,
                                // url: event.url,
                                startDate: event.dates.start.localDate,
                                startTime: event.dates.start.localTime,
                                CategoryId: dbCategory.dataValues.id
                            }
                        });
                        return dbData; // use responseData to return ticketmaster formatted data
                    })
                return db_data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

module.exports = ticketmaster