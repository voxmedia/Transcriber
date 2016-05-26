# Lightweight Speech to text desktop app for OSX Using IBM Watson API

## IBM Speech to text API

To use this app you need to get IBM Watson API keys for their speech to text service, by making an account with [Bluemix](https://console.ng.bluemix.net/)

## Usage
You can either download the compiled version from the project release section. Or if you clone the repo you can start the app with `npm start`.

## Setting API keys

First time you start the application you'd be prompt to set the API keys.

Should you need to change those you can use shortcut `cmd + shift + a`.

These are saved inside the app as a json file `wttskeys.json` at the of the application.



## Overview of project

- Once you select a video, the app converts into audio and sends it to the IBM Speech to text API.
- When the transcription comes back it's copied to clipboard, unless you un-tick the option in the menu.
- Paste the transcription wherever you want and take it from there.

## Technical overview

### Convert video to audio
The `video_to_audio` module converts video or audio into IBM audio specs.  Itially modified from[Sam Lavine](https://github.com/antiboredom)'s [gist](https://gist.github.com/pietrop/5008653567df73d813e525c6b89b23b6).

Audio files are saved in `./tmp/audio` folder.

<!-- more on IBM audio specs here -->

### Speech to text API
The `stt` folder contains the module to interact with the IBM Speech to text API.
If you want to dive more into this [their documentation](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text/api/v1/#api_explorer) on how to interact with the API is pretty good.

### Transcribing video
`transcribe.js` requires both modules described above and brings it all together.

Converts audio into video, and then sends it to Watson for transcriptions. Transcriptions are saved onto a text file in `./tmp/text` folder.

module returns the path to the text file.

`index.js` abstracts `transcribe.js` in case the interface needs to change at a later stage.

### NWJS
`indext.html` contains the Implementation of the NWJS app.
Adding Menu Tray to the application.

See comments in the code [``./index.html`](./index.html) and [nwjs wiki](https://github.com/nwjs/nw.js/wiki) as well as [nwjs documentation](http://docs.nwjs.io/en/latest/) for more on this.

## User flow
When a user selects a video it's transcribed, appropriate system notifications for start and end are triggered.

When done unless option is un-ticked transcription is saved to clipboard.

in which case user can click on `Copy transcriptions to cliboard` to get the transcriptions.

## Build NWJS app
To rebuild the app in NWJS refer to the [documentation](http://docs.nwjs.io/en/latest/For%20Users/Package%20and%20Distribute/)

Install

```
npm install -g nw-builder
```

From one level above the applicaiton folder (`cd ..` from root of repo)
```
nwbuild -p osx64 ./transcriber
```

creates a `build` folder that contains the app

## Todo

- [ ] Write proper test using testing framework.
- [ ] IBM has a size limit of 100mb per audio post request. Figure out if there's a use case when converting video to audio it exceeds that size. Rough test with 54gb video to audio with that module ended up 50 to 70 mb. So it would seem ok for now?


<!-- icon img  https://pixabay.com/en/switch-detonator-buttons-153517/ -->
