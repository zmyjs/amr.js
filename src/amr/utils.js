import { PCMData } from '../pcmdata/index.js';

export const AMRConfig = {
    MAGIC_NUMBER: [35, 33, 65, 77, 82, 10],
    /** Decoding modes and its frame sizes (bytes), respectively */
    modes: {
        0: 12,
        1: 13,
        2: 15,
        3: 17,
        4: 19,
        5: 20,
        6: 26,
        7: 31,
        8: 5,
    }
};

export function toWAV(data) {
    const waveData = PCMData.encode({
        sampleRate: 8000,
        channelCount: 1,
        bytesPerSample: 2,
        data,
    });

    return 'data:audio/wav;base64,' + btoa(waveData);
}