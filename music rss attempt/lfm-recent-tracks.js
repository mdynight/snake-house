(function($){ //put everything in a wrapper to ensure jQuery's use of $ doesn't conflict with other libraries
        //see http://www.last.fm/api/show/user.getRecentTracks for API documentation
        //there are more optional parameters such as to, from, & page that this example doesn't use
        var user = "fanksy"
        var apiKey = "09ea53b305db56e3a130931555df0f1c"
        //using jQuery's GET method for ajax
        $.get("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=5&user=" + user + "&api_key=" + apiKey,
            function(response){ //callback function, runs upon receiving response
                var output = '<ul style="list-style-type:none">';
                $(response).find('track').each(function(){
                    var trackURL = $(this).find('url').text(); //url for the specific track
                    var trackName = $(this).find('name').text(); //name of the track
                    var artist = $(this).find('artist').text(); //artist
                    var date = $(this).find('date').text(); //date & time played
                    var trackFinal = "<li>";
                    if (date) {
                        trackFinal += date + " - ";
                    }
                    else {
                        trackFinal += "Now playing: "; //currently-playing songs have no date
                    };
                    trackFinal += " <a href='" + trackURL + "'>" + trackName + "<\/a> by <a href='http://www.last.fm/music/";
                    trackFinal += encodeURIComponent(artist) //artist names may have special characters e.g. Why?
                    trackFinal += "'>" + artist + "<\/a><\/li>";
                    output += trackFinal;
                });
                output += "</ul>";
                $('#recent-tracks').html(output).fadeIn('slow'); //nice fade in effect
            },
            "xml"); //expecting XML as a response, could leave this blank
}(jQuery)); //execute wrapper function with $ = jQuery