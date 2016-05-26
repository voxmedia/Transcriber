var transcribe = require('./index.js');

var demo_video = './demo_media/norman_door.mp4';

transcribe(demo_video, function(res){
  console.log("FINAL")
  console.log(res)
})
