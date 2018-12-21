var axios = require("axios");

axios
  .get("https://app.ticketmaster.com/discovery/v2/attractions.json", {
    params: {
      apikey: "QpgAlmehADBTbnhbCGSGXmv5wqyRcSpo",
      startDateTime: "2018-12-22T00:00:00Z",
      endDateTime: "2018-12-22T23:59:00Z",
      city: "Chicago",
      countryCode: "US",
      stateCode: "IL",
      classificationName: "sports",
      page: 0
    }
  })
  .then(function(response) {
    console.log(JSON.stringify(response.data, null, " "));
  })
  .catch(function(error) {
    console.log(error);
  });
