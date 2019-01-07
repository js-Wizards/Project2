var express = require('express');
var app = express ();
var request = require('request');
var PORT = process.env.PORT || 3000;
// app.set('events', 'handlebars');

app.get ('/api/events/:movies', function(req, res){
request('https://api.themoviedb.org/3/movie/now_playing?page={0}&api_key=b581c4d113c1f1b3cf4290af36b50791', function (error, response, body) {
    // Print the error if one occurred
 if(!error && response.statusCode == 200){
    var results = JSON.parse(body);
        res.send(results["results"][0]["title"]); 
     }
  
});
});


app.listen(PORT, function() {
   console.log(
     "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
     PORT,
     PORT
   );
 });
// console.log ("AMC Theater and shows near you: ")