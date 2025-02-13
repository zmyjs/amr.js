import { PCMData } from '../pcmdata/index.js';

export function play(floats) {
	var waveData = PCMData.encode({
		sampleRate: 8000,
		channelCount: 1,
		bytesPerSample: 2,
		data: floats,
	});

	var element = new Audio();
	element.src = "data:audio/wav;base64," + btoa(waveData);
	element.play();
}