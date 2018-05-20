# liri-node-app

LIRI, short for *L*anguage *I*nterpretation and *R*ecognition *I*nterface, is a command line node app that returns data from Twitter, Spotify and the Open Movie Database (OMDB).  The user may choose from the following four commands:

"my-tweets" - returns my most recent tweets, limited to 20 entries.

"spotify-this-song" [user entered song title] - returns full song title, artist, album and a url (if available)

"movie-this" [user entered movie title] - returns full movie title, release year, rating, country, language, plot and actors 

"do-what-it-says" - reads a text file and returns the song data for our *random* choice:  "End of the Line" by the Traveling Wilburys

If the user enters a command other than one of these four functionalities, the app will execute the "do-what-it-says" scenario.

# NPM packages used:
* twitter
* node-spotify-api
* request (used to get OMDB data)
* dotenv (used to hold private key data for Twitter and Spotify)
