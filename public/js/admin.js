$(".load-button").on("click", function () {
    const category = $(this).attr("data-id");
    console.log("clicked button");
    console.log(category);
    $.ajax("/api/loaddata/" + category, {
        type: "GET"
    }).then(function () {
        console.log("get event info");
        
        // Reload the page to get the updated list
        location.reload();
    });
});