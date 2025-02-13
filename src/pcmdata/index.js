import { createBinary, createStream } from './binarystream.js';
import { createPCMData } from './pcmdata.js';

export const Binary = createBinary();
export const Stream = createStream(Binary);
export const PCMData = createPCMData(Binary, Stream);