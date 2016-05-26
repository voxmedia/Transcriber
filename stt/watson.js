/**
* Takes audio file less then 100mb and sends it to IBM watson to be transcribed.
* Transcription is then saved as a file. and path of that file is returned.
*/

//https://github.com/watson-developer-cloud/node-sdk#speech-to-text
var watson = require('watson-developer-cloud');
var fs = require("fs");

//setting a path to a transcription folder where to save text stream recieved from IBM API
//TODO: Destination folder of transcriptions could be moved as a param of `watsonTranscribe()`. to make the module more system indipendent.
// var tmpTranscriptionFolder = "./tmp/text"

//  Initialise var so that scope allows to set api keys
// and use it inside `watsonTranscibe()` function
var speech_to_text;

/**
* takes in json of api keys
* `var keys = {username: "",password: ""}``
*/
function setAPIkeys(keys){
  speech_to_text = watson.speech_to_text({
   username: keys.username,
   password: keys.password,
   version: 'v1'
 });
}

/**
* takes in autio file path
* returns callback with file path to text file containing transcriptions.
*/
function watsonTranscribe(audioFile,tmpTranscriptionFolder, cb){

var processingAudio = false;

  var tmpTranscriptionText = tmpTranscriptionFolder+"/"+getFileName(audioFile)+".transcription.txt"

  //initialise writing stream to capture IBM API response
  var writableStream = fs.createWriteStream(tmpTranscriptionText);

  // stream audio to IBM API
  fs.createReadStream(audioFile)
    .pipe(speech_to_text.createRecognizeStream(
      { content_type: 'audio/l16; rate=44100' })
    )
      // gets back transcription through data stream
    .on('data', function(chunk) {
        //writes response(text transcription) to file locally uising stream
        writableStream.write(chunk);
        console.log("processing audio")
        processingAudio = true;
    })
    // when streaming from IBM API finishes return callback
    .on('close', function(){
      console.log('request finished downloading file');
      processingAudio = false;
      //callback returns file path/name of the text transcription
      cb(tmpTranscriptionText)
  });
}//transcribe


/**
* Helper function to extracts file name from file path string
*/
function getFileName(fileNameWithPath){
     return fileNameWithPath.split("/").pop()
}


module.exports = watsonTranscribe;

module.exports.setKeys = setAPIkeys;
