var convertToWav = require("./video_to_audio.js");

var demo_video_file="../demo_media/norman_door.mp4";
var demo_temp_audio_destination = "../tmp/audio/norman_door.mp4"+".temp.wav";

convertToWav(demo_video_file, demo_temp_audio_destination, function(res){
  console.log(demo_video_file)
  //returns audio file path
  console.log(res)
});
