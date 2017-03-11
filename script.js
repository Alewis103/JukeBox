var redBone = document.getElementById('redbone');
var intoyou = document.getElementById("sointoyou");
var got = document.getElementById("got");
var muy = document.getElementById("muy_tran");
var r309 = document.getElementById("309");

var playList = [redBone, intoyou, got, muy, r309];
var my_juke = new JukeBox(playList);

$(function() {
    third = new freezeframe('.space').capture().setup();

    $('#play').click(function(e) {
        e.preventDefault();
        third.trigger();
    });

    $('#next').click(function(e) {
        e.preventDefault();
        third.trigger();
    });

    $('#back').click(function(e) {
        e.preventDefault();
        third.trigger();
    });

    $("#playlist").click(function(e) {
        e.preventDefault();
        third.trigger();
    });

    $('#stop').click(function(e) {
        e.preventDefault();
        third.release();
    });

    $('#pause').click(function(e) {
        e.preventDefault();
        third.release();
    });

})

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    var track = document.querySelector("#search").value;
    $("#playlist").append("<li " + "onclick = 'listPlay(this.id)' " + ">" + track + "</li>");
    var counter = $("li").length - 1; // TODO length of li array minus 1 CHANGE VAR NAME!!
    var count = counter + 1; // TODO CHANGE NAME
    var trackNo = "track" + count.toString();
    document.getElementsByTagName("li")[counter].setAttribute("id", trackNo);
    $.ajax({
        url: "https://api.spotify.com/v1/search",
        data: {
            q: track,
            type: "track"
        },
        success: function(response) {
            var newSong = response.tracks.items[0].preview_url;
            $(".audio_cont").append("<audio>" + track + "</audio>");
            var last = $("audio").length - 1;
            var comRem = track.replace(/,/i, ""); // commas removed from track
            var spRem = comRem.split(' ').join(''); //spaces removed from track
            var finStr = spRem.split("'").join(''); // apostrophes removed
            console.log("this is audio id : " + finStr);
            document.getElementsByTagName("audio")[last].setAttribute("src", newSong);
            document.getElementsByTagName("audio")[last].setAttribute("id", finStr);
            var id = "#" + finStr;
            console.log("this is  list id " + id);
            var spotify = $(id)[0];
            console.log("this is var spotify " + spotify);
            my_juke.playList.push(spotify);
            console.log(response.tracks.items[0].preview_url);
        }
    })

})
// button listeners
document.getElementById("play").addEventListener("click", function() {
    my_juke.play();
});

document.getElementById("stop").addEventListener("click", function() {
    my_juke.stop();
});

document.getElementById("pause").addEventListener("click", function() {
    my_juke.pause();
});

document.getElementById("next").addEventListener("click", function() {
    my_juke.nex();
});

document.getElementById("back").addEventListener("click", function() {
    my_juke.back();
});

//list item listeners
document.getElementById('track1').addEventListener("click", function() {
    my_juke.stop();
    my_juke.curr_track = 0;
    my_juke.play();
});
document.getElementById('track2').addEventListener("click", function() {
    my_juke.stop();
    my_juke.curr_track = 1;
    my_juke.play();
});

document.getElementById('track3').addEventListener("click", function() {
    my_juke.stop();
    my_juke.curr_track = 2;
    my_juke.play();
});

document.getElementById('track4').addEventListener("click", function() {
    my_juke.stop();
    my_juke.curr_track = 3;
    my_juke.play();
});

document.getElementById('track5').addEventListener("click", function() {
    my_juke.stop();
    my_juke.curr_track = 4;
    my_juke.play();
});

function listPlay(id) {
    var truncate = "track".length - id.length; // the difference indicates how many places the track  number is aka the track number
    var count = id.slice(truncate); // gets last element in id (which is track number)
    my_juke.stop();
    my_juke.curr_track = parseInt(count - 1);
    my_juke.play();
}

function JukeBox(playList) {
    this.curr_track = 0;
    this.playList = playList;
    this.trackNo = this.playList.length;
    this.play = function() {
        this.playList[this.curr_track].play();
    }
    this.stop = function() {
        this.playList[this.curr_track].pause();
        this.playList[this.curr_track].currentTime = 0;
    }
    this.pause = function() {
        this.playList[this.curr_track].pause();
    }
    this.nex = function() {
        this.playList[this.curr_track].pause();
        this.playList[this.curr_track].currentTime = 0;
        this.curr_track = (this.curr_track + 1) % playList.length;
        this.playList[this.curr_track].play();
    }
    this.back = function() {
        this.playList[this.curr_track].pause();
        this.playList[this.curr_track].currentTime = 0;

        if (this.curr_track === 0) {
            this.curr_track = playList.length - 1
            this.playList[this.curr_track].play();
        } else {
            this.curr_track -= 1;
            this.playList[this.curr_track].play();
        }

    }


}
