import AMRDecoder from './decoder.js';
import AMREncoder from './encoder.js';

function AMR(params) {
    !params && (params = {});
    this.params = params;

    this.frame_size = params.frame_size || 320;

    this.ring_size = params.ring_size || 2304;

    this.linoffset = 0;

    this.ringoffset = 0;

    this.modoffset = 0;

    this.linbuf = new Int16Array(this.frame_size);

    this.ring = new Int16Array(this.ring_size * 2);

    this.modframes = new Int16Array(this.frame_size);

    this.framesbuf = [];

    this.decoder = new AMRDecoder(params);
    this.encoder = new AMREncoder(params);

    this.init();
}

AMR.prototype.init = function () {
    this.encoder.init();
    this.decoder.init();
};

AMR.prototype.set = function (name, value) {
    this.options[name] = value;
};

AMR.prototype.enable = function (option) {
    this.set(option, true);
};

AMR.prototype.disable = function (option) {
    this.set(option, false);
};

/**
 * Initialize the codec
 */
AMR.prototype.init = function () {
    this.encoder.init();
    this.decoder.init();
};

/**
 * @argument pcmdata Float32Array|Int16Array
 * @returns String|Uint8Array
 */
AMR.prototype.encode = function (data, isFile) {
    isFile = !!isFile;

    if (isFile) {
        return this.encoder.process(data);
    }

    // ring spin
    for (let i = -1, j = this.ringoffset; ++i < data.length; ++j) {
        this.ring[j] = data[i];
    }

    this.ringoffset += data.length;

    // has enough to decode
    if (
        this.ringoffset > this.linoffset &&
        this.ringoffset - this.linoffset < this.frame_size
    ) {
        return;
    }

    // buffer fill
    for (let i = 0, l = this.linbuf.length; i < l; i++) {
        this.linbuf[i] = this.ring[this.linoffset + i];
    }

    this.linoffset += this.linbuf.length;
    this.framesbuf = this.encoder.process(this.linbuf);

    if (this.ringoffset > this.ring_size) {
        this.modoffset = this.ringoffset % this.ring_size;

        //console.log("ignoring %d samples", this.modoffset);
        this.ringoffset = 0;
    }

    if (this.linoffset > this.ring_size) {
        this.linoffset = 0;
    }

    return this.framesbuf;
};

/**
 * @argument encoded String|Uint8Array
 * @returns Float32Array
 */
AMR.prototype.decode = function (bitstream) {
    return this.decoder.process(bitstream);
};

/**
 * Closes the codec
 */
AMR.prototype.close = function () {
    this.encoder.close();
    this.decoder.close();
};

export default AMR;
