var watsonTranscribe = require("./watson.js");
var demo_audio = "../tmp/audio/norman_door.mp4.temp.wav"

var keys = {username: "",password: ""}
watsonTranscribe.setKeys(keys)

watsonTranscribe(demo_audio, function(res){
  // console.log("finished!!!!")
  console.log(res)
})
