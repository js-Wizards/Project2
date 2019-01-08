$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    $(".member-name").attr("data-userid", data.id);
  });
});


$("#add_to_my_events").on("click", function () {
  const userID = $(".member-name").attr("data-userid");
  const eventID = $("#event-card").attr("data-eventID");
  console.log("clicked add to my events button");
  console.log(userID);
  $.post("/api/events", {
      UserId: userID,
      eventId: eventID
  }).then(function (myData) {
      console.log("posting");
      console.log(myData);
      // Reload the page to get the updated list
      location.reload();
  });
});

