/*
* convert video file to audio
* use node fluent ffmpeg (to be able to specify path to ffmpeg binary)
* and to avoid security issues associated with calling child process making system call to ffmpeg.
* IBM API Audio settings from sam's github gist https://gist.github.com/antiboredom/9bed969c8b2f89ea4b6c#file-transcribe-js-L18
*
*/

var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
// Setting ffmpeg path to ffmpeg binary for os x so that ffmpeg can be packaged with the app.
ffmpeg.setFfmpegPath("./bin/ffmpeg")
//because of the nature of ffmpeg, this can take both audio or video files as input
function convertToWav(file,output, cb) {
  var  audioBitRateFor100mbSize='2';
  var aud_file =  output;
  var comand = ffmpeg(file)
                .noVideo()
                .audioCodec('pcm_s16le')
                .audioChannels(1)
                .audioFrequency(16000)
                .audioBitrate(audioBitRateFor100mbSize, true)
                // .videoBitrate(audioBitRateFor100mbSize, true)
                .output(aud_file)
                .on('progress', function(progress) {
                  //  progress // {"frames":null,"currentFps":null,"currentKbps":256,"targetSize":204871,"timemark":"01:49:15.90"}
                  console.log('Processing: ' + progress.timemark + ' done ' + progress.targetSize+' kilobytes');
                })
                .on('end',
                //listener must be a function, so to return the callback wrapping it inside a function
                  function(){
                    cb(aud_file)
                  }
                  || function() {
            	       console.log('Finished processing');
            	    }
                ).run();
}

module.exports = convertToWav;
