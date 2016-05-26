/*
* Using watson stt module, and video to audio conversion as dependencies
* transcribe module takes in a video file path, the IBM watson Speech to Text API Keys and a destination folder to save the transcriptions in.
* As well as a callback to return the path/name of transcription once reciving transcription from the API and saving it to file is complete.
*
*
* There is a restriction on the IBM API that the audio file needs to be less then 100mb, but for now I've removed any validation on the size of the audio file. Because when testing converting 54gb video file with the `video_to_audio` dependency the resulting audio was between 50 and 70mb.
*
* ffprobe could be use to implement such validation should there was a need for it in the future.
*/
var convertToWav = require("./video_to_audio_processing/video_to_audio.js");
var watsonTranscribe = require("./stt/watson.js");

/*
* Params: video file path/name, IBM API Keys as object with username password attributes, audio file folder destination path, transcription text folder destination path.
callback to return  path to text transcription file.
*/
function transcribe(videoFile,keys,tmpAudioFolder,destTextFolder, cb){
  //set IBM API keys
  watsonTranscribe.setKeys(keys)
    //defines audio file new name with full path.
    var tempAudioDestination = tmpAudioFolder+getFileName(videoFile)+".temp.wav";
    //convert video to audio, returns path to audio file
    convertToWav(videoFile, tempAudioDestination, function(resAudioFile){
            //transcribed audio file by sending to IBM API
            watsonTranscribe(resAudioFile, destTextFolder ,function(resTranscriptionTextFilePath){
              //res, returns the filename of transcription text file
              cb(resTranscriptionTextFilePath)
            })//watsonTranscribe
    });//convertToWav
  /**
  * helper function extracts file name from file path
  */
  function getFileName(fileNameWithPath){
       return fileNameWithPath.split("/").pop()
  }

}

module.exports = transcribe;
