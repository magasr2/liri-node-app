var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var inquirer = require("inquirer");

//var movieName = process.argv[2];

// Then run a request to the OMDB API with the movie specified
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Which movie would you like to Search?",
      name: "getMovie"
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    },{
    	type: "confirm",
      message: "Would you like to view my tweets:",
      name: "confirmTweets",
      default: true
    }, {
    	 type: "input",
      message: "Which song would you like to look up?",
      name: "getSong"
    }, {
    	type: "confirm",
      message: "Are you sure?:",
      name: "confirmSong",
      default: true
    }])
    // Here we create a basic password-protected text prompt.
    /*
    {
      type: "password",
      message: "Set your password",
      name: "password"
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    },
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "Which Pokemon do you choose?",
      choices: ["Bulbasaur", "Squirtle", "Charmander"],
      name: "pokemon"
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  */
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
    	var movieName = inquirerResponse.getMovie;
    	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
		//console.log(queryUrl);

		request(queryUrl, function(error, response, body){
		if(!error && response.statusCode === 200){
		console.log("Movie Release Year: " + JSON.parse(body).Year);
	};
		});
	};

	if(inquirerResponse.confirmTweets){
		var params = {screen_name: 'charliemagasr'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	if(!error){
		console.log(tweets);
	} else {
		console.log(error);
	}
});
	}

	if(inquirerResponse.confirmSong){
		spotify.search({type: 'track', query: inquirerResponse.getSong}, function(err, data){
	if(err){
		return console.log("Error occurred: " + err);
	}
	console.log("Your songs info " + data);
});
	}

});
      


/*
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

request(queryUrl, function(error, response, body){
	if(!error && response.statusCode === 200){
		console.log("Movie Release Year: " + JSON.parse(body).Year);
	}
})
*/

var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);

/*
request(queryUrl, function(error, response, body){
		if(!error && response.statusCode === 200){
		console.log("Movie Release Year: " + JSON.parse(body).Year);



//Twitter api method
var params = {screen_name: 'charliemagasr'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
	if(!error){
		console.log(tweets);
	} else {
		console.log(error);
	}
});

//Spotify api method
spotify.search({type: 'track', query: "All the Small Things"}, function(err, data){
	if(err){
		return console.log("Error occurred: " + err);
	}
	console.log(data);
});
*/

