import AMR from './amr/amr.js';
import { toWAV } from './amr/utils.js';

class AMRAudio {
    constructor(float32Array) {
        this.createContext(float32Array);
    }

    /**
     * Creates an audio context and buffer from a given Float32Array.
     *
     * @param {Float32Array} float32Array - The array of audio data to be used for creating the buffer.
     */
    createContext(float32Array) {
        const context = new AudioContext();
        // 8000 Hz 是 AMR 的标准采样率
        const buffer = context.createBuffer(1, float32Array.length, 8000);
        buffer.getChannelData(0).set(float32Array);

        this.context = context;
        this.buffer = buffer;
    }

    /**
     * Creates an audio buffer source, connects it to the audio context's destination,
     * and sets up an event handler for when the audio playback ends.
     * 
     * @method createSource
     * @memberof AudioPlayer
     * @instance
     * 
     * @example
     * audioPlayer.createSource();
     * 
     * @fires AudioPlayer#onEnd
     */
    createSource() {
        const audio = this;
        const source = this.context.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.context.destination);
        source.onended = function (event) {
            delete audio.source;
            audio.onEnd?.(event);
        };
        this.source = source;
    }

    start() {
        this.stop();
        this.createSource();
        this.source.start(...arguments);
    }

    stop() {
        if (this.source) {
            this.source.stop();
        }
    }

    close() {
        return this.context.close();
    }

    suspend() {
        return this.context.suspend();
    }

    resume() {
        return this.context.resume();
    }

    get state() {
        return this.source ? this.context.state : 'stopped';
    }

    /**
     * Toggles the state of the current instance between 'stopped', 'running', and 'suspended'.
     * 
     * If the current state is 'stopped', it will start the instance.
     * If the current state is 'running', it will suspend the instance.
     * If the current state is 'suspended', it will resume the instance.
     * 
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the state transition is complete.
     */
    async toggle() {
        const { state } = this;

        if (state === 'stopped') {
            this.start();
        } else if (state === 'running') {
            await this.suspend();
        } else if (state === 'suspended') {
            await this.resume();
        }
    }
}

class AMRPlayer extends AMR {
    constructor(params) {
        super(params);
    }

    /**
     * Sets the buffer by decoding the given ArrayBuffer into a Float32Array.
     *
     * @param {ArrayBuffer} arrayBuffer - The buffer to be decoded.
     * @returns {Float32Array} The decoded float32 array.
     */
    setBuffer(arrayBuffer) {
        const uint8Array = new Uint8Array(arrayBuffer);
        const float32Array = this.decode(uint8Array);
        this.float32Array = float32Array;
        return float32Array;
    }

    /**
     * Asynchronously sets the blob by converting it to an ArrayBuffer and then setting the buffer.
     * 
     * @param {Blob} blob - The blob to be converted and set.
     * @returns {Promise<void>} A promise that resolves when the buffer has been set.
     */
    async setBlob(blob) {
        const arrayBuffer = await blob.arrayBuffer();
        return this.setBuffer(arrayBuffer);
    }

    /**
     * Creates an instance of AMRAudio with the provided float32Array and sets the onEnd callback.
     *
     * @param {Function} onEnd - The callback function to be called when the audio ends.
     * @returns {AMRAudio} An instance of AMRAudio with the onEnd callback set.
     */
    getAudio(onEnd) {
        const audio = new AMRAudio(this.float32Array);
        audio.onEnd = onEnd;
        return audio;
    }

    /**
     * Converts the stored Float32Array to a WAV format.
     *
     * @returns {ArrayBuffer} The WAV formatted audio data.
     */
    getWAV() {
        return toWAV(this.float32Array);
    }
}

export default AMRPlayer;