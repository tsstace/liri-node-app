require("dotenv").config();

// divider will be used as a spacer between the data we print in log.txt
var divider =
	"\n------------------------------------------------------------\n\n";

//Variables for needed npm modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var keys = require('./keys');

//Variable for user input
var command = process.argv[2];

//Variable for album info to be displayed as object
var albumObj = {};


//Main function that takes in the following commands: my-tweets; spotify-this-song; movie-this; do-what-it-says
function goLiri() {
	if (command === "my-tweets") {
		myTweets();
	} else if (command === "spotify-this-song") {
		var songName = process.argv[3];
		songSearch(songName);
	} else if (command === "movie-this") {
		var movie = process.argv[3];
		movieSearch(movie);
	} else if (command === "do-what-it-says") {
		doWhatItSays();
	} else {
		// unexpected command entered - default to the 'do-what-it-says' case	
		doWhatItSays();
	}
}

function myTweets() {
	var client = new Twitter(keys.twitter);
	var params = {
		screen_name: 'Stacey48440797',
		count: 20
	};
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (error) {
			console.log(error)
		}
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log("=========================");
				console.log("Date " + tweets[i].created_at);
				console.log(tweets[i].text);
				fs.appendFile("log.txt", (tweets[i].text) + divider, function (err) {
					if (err) throw err;
				});

			}
		}
	});
}

function songSearch(song) {
	var spotify = new Spotify(keys.spotify);
	spotify.search({
		type: 'track',
		query: song || "Double Dutch Bus"
	}, function (err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		} else {
			//Iterate into spotify object by saving path in variable
			var albumInfo = data.tracks.items;
			//Place Artist, Song Name, Preview url, Album into Object - albumObj
			albumObj.songName = albumInfo[0].name;
			var previewUrl = albumInfo[0].preview_url;
			albumObj.previewUrl = albumInfo[0].preview_url;
			var albumName = albumInfo[0].album.name;
			albumObj.albumName = albumInfo[0].album.name;
			var artist = albumInfo[0].artists;
			albumObj.artist = artist[0].name;
			//Display Object containing all info: Artist, Song Name, Preview url, Album
			console.log("=========ALBUM-INFO=============");
			console.log(albumObj);
			fs.appendFile("log.txt", (albumObj.songName) + divider, function (err) {
				if (err) throw err;
			});

		}
	});
}

function movieSearch(movie) {
	request("http://www.omdbapi.com/?apikey=trilogy&t=" + (movie || "Back To The Beach"), function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var body = JSON.parse(body);
			console.log("Title: " + body.Title);
			console.log("Release Year: " + body.Year);
			console.log("IMdB Rating: " + body.imdbRating);
			console.log("Country: " + body.Country);
			console.log("Language: " + body.Language);
			console.log("Plot: " + body.Plot);
			console.log("Actors: " + body.Actors);
			fs.appendFile("log.txt", (body.Title) + divider, function (err) {
				if (err) throw err;
			});
		} else {
			console.log('Error occurred.')
		}
	});

}

//Function uses npm file system module to read file and return info into an array 
function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function (err, data) {
		// Split the string and store the contents in an array.
		var output = data.split(",");
		command = output[0];
		readFileSong = output[1];
		process.argv[3] = readFileSong;
		// invoking the 'spotify-this-song' command with our default song info		
		goLiri();
	});
}

goLiri();