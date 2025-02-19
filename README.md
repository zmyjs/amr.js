# AMRPlayer

[![npm](https://img.shields.io/npm/v/amrplayer.svg)](https://www.npmjs.com/package/amrplayer)

AMRPlayer is a modernized version of [amr.js](https://github.com/jpemartins/amr.js), supporting the loading and playback of AMR audio format.

amr.js has ceased updates, utilizing numerous global variables, lacking support for strict mode, not supporting modularity, and missing documentation.

This project has modernized it, supporting ES Module, CommonJS, and IIFE formats, compatible with modern build tools (such as Webpack, Rollup, Vite, etc.). It also adds playback control support and convenient data writing methods.

> I used AMR audio interpretation in my project and found that there are not many libraries to choose from. Although amr.js lacks maintenance, it is still usable. Thanks to the original authors for their contributions, and thus I also share my achievements with everyone.

[中文](./README.CN.md)

## Features

- Easy loading of AMR audio files.
- Provides audio playback control.
- Supports converting AMR audio to WAV format.
- Compatible with modern JavaScript build tools.
- No longer uses multiple global variables; modular environments do not require global variables, and only one global variable is exposed in the browser environment.

## Installation

You can install AMRPlayer via npm:

```bash
npm install amrplayer
```

## Import Methods

Depending on your project environment, you can choose any of the following methods to import AMRPlayer.

### 1. ES Module (Recommended)

If your project uses ES Module (e.g., Vite or modern browser environments), you can import it as follows:

```javascript
import AMRPlayer from 'amrplayer';

// Using AMRPlayer
const amrplayer = new AMRPlayer();
```

### 2. CommonJS

If your project uses CommonJS, you can import it as follows:

```javascript
const AMRPlayer = require('amrplayer');

// Using AMRPlayer
const amrplayer = new AMRPlayer();
```

### 3. Browser

If you are directly using the `<script>` tag in the browser, you can import it as follows:

```html
<script src="https://unpkg.com/amrplayer/dist/amrplayer.js"></script>
<script>
    // AMRPlayer will be exposed as a global variable
    const amrplayer = new AMRPlayer();
</script>
```

## Usage Examples

### Initializing AMRPlayer

```javascript
import AMRPlayer from 'amrplayer';

const amrplayer = new AMRPlayer();
```

### Loading AMR Audio Files

#### Loading from `ArrayBuffer`

```javascript
fetch('audio.amr')
   .then(response => response.arrayBuffer())
   .then(arrayBuffer => amrplayer.setBuffer(arrayBuffer));
```

#### Loading from `Blob`

```html
<input type="file" name="file" id="file" accept=".amr">
```

```javascript
const file = document.getElementById('file').files[0];
// Note that setBlob is an asynchronous interface
await amrplayer.setBlob(file);
```

### Converting to WAV Format

Convenient for playback using `<audio>`.

```html
<audio id="audio" controls></audio>
```

```javascript
const url = amrplayer.getWAV();
document.getElementById('audio').src = url;
```

### Audio Playback

```javascript
const amraudio = amrplayer.getAudio(() => console.log('Audio playback ended'));

// Synchronous interface
amraudio.start(); // Start playback
amraudio.stop(); // Stop playback

// Asynchronous interface
amraudio.suspend(); // Pause playback
amraudio.resume(); // Resume playback
amraudio.toggle(); // Toggle playback state
amraudio.close(); // Close the audio context when amraudio is no longer needed
```

### Audio State

```javascript
console.log('Current audio state:', amraudio.state);
```

## API Documentation

### `new AMRPlayer()`

### `AMRPlayer.setBuffer(arrayBuffer)`

Decodes the passed `ArrayBuffer` into `Float32Array` and sets it as the audio data.

- `arrayBuffer`: The `ArrayBuffer` to decode.
- Returns the decoded `Float32Array`.

### `AMRPlayer.setBlob(blob)`

Converts the passed `Blob` into `ArrayBuffer` and sets it as the audio data.

- `blob`: The `Blob` to convert.
- Returns a `Promise` that resolves to the decoded `Float32Array`.

### `AMRPlayer.getAudio(onEnd)`

Creates an `AMRAudio` instance and sets the callback function for when audio playback ends.

- `onEnd`: The callback function triggered when audio playback ends.
- Returns an `AMRAudio` instance.

### `AMRPlayer.getWAV()`

Converts the current audio data to WAV format.

- Returns a base64 string: `data:audio/wav;base64,...`

---

### `AMRAudio` Class

#### `new AMRAudio(float32Array)`

Creates an `AMRAudio` instance.

- `float32Array`: The `Float32Array` used to create the audio buffer.

#### `AMRAudio.start()`

Starts audio playback.

#### `AMRAudio.stop()`

Stops audio playback.

#### `AMRAudio.close()`

Closes the audio context. Asynchronous interface.

#### `AMRAudio.suspend()`

Suspends the audio context. Asynchronous interface.

#### `AMRAudio.resume()`

Resumes the audio context. Asynchronous interface.

#### `AMRAudio.toggle()`

Toggles the audio playback state, cycling through: play -> pause -> resume. Asynchronous interface.

#### `AMRAudio.state`

Gets the current audio playback state: `'stopped', 'running', 'suspended'`.

#### `AMRAudio.onEnd()`

Automatically called when playback ends. Triggered by automatic end or calling `AMRAudio.stop()`.

---

## License

This project is open-sourced under the MIT license. For more details, please refer to the [LICENSE](LICENSE) file.
