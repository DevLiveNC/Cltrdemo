import fs from 'fs';
import path from 'path';

function createWavHeader(numSamples, sampleRate = 44100, numChannels = 1, bitsPerSample = 16) {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = numSamples * numChannels * (bitsPerSample / 8);
  const chunkSize = 36 + dataSize;

  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(chunkSize, 4);
  buffer.write('WAVE', 8);

  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

const sampleRate = 44100;

class BiquadFilter {
  constructor(type, freq, Q, sampleRate) {
    this.x1 = 0; this.x2 = 0;
    this.y1 = 0; this.y2 = 0;
    this.setParams(type, freq, Q, sampleRate);
  }

  setParams(type, freq, Q, sampleRate) {
    const w0 = 2 * Math.PI * Math.min(freq, sampleRate * 0.45) / sampleRate;
    const alpha = Math.sin(w0) / (2 * Q);
    const cosw0 = Math.cos(w0);

    if (type === 'bandpass') {
      this.b0 = alpha;
      this.b1 = 0;
      this.b2 = -alpha;
      this.a0 = 1 + alpha;
      this.a1 = -2 * cosw0;
      this.a2 = 1 - alpha;
    }
  }

  process(x) {
    const y = (this.b0/this.a0)*x + (this.b1/this.a0)*this.x1 + (this.b2/this.a0)*this.x2
            - (this.a1/this.a0)*this.y1 - (this.a2/this.a0)*this.y2;
    this.x2 = this.x1; this.x1 = x;
    this.y2 = this.y1; this.y1 = y;
    return y;
  }
}

// 1. Snappy Chirp Scratch (Fast & Sharp ~0.22s)
function generateScratch1() {
  const duration = 0.22;
  const numSamples = Math.floor(sampleRate * duration);
  const header = createWavHeader(numSamples, sampleRate);
  const filter = new BiquadFilter('bandpass', 1200, 3.5, sampleRate);
  let phase = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const p = t / duration;

    const speed = p < 0.35 ? Math.sin((p / 0.35) * Math.PI * 0.5) * 1.9 : 1.9 * Math.pow(1 - (p - 0.35) / 0.65, 2.5);
    const freq = Math.max(150, 320 + speed * 1300);
    filter.setParams('bandpass', freq * 2.1, 3.2, sampleRate);

    phase += (2 * Math.PI * freq) / sampleRate;
    const saw = 2 * ((phase / (2 * Math.PI)) % 1) - 1;
    const noise = filter.process(Math.random() * 2 - 1);

    const click = p < 0.05 ? Math.sin(p / 0.05 * Math.PI) * Math.sin(t * 140 * 2 * Math.PI) * 0.6 : 0;
    const env = p < 0.02 ? p / 0.02 : Math.pow(1 - (p - 0.02) / 0.98, 1.8);

    const val = (saw * 0.45 + noise * 0.5 + click) * env * 0.85;
    header.writeInt16LE(Math.floor(Math.max(-1, Math.min(1, val)) * 32767), 44 + i * 2);
  }
  return header;
}

// 2. Deep Heavy Drop Scratch (Kalın & Tok Sub-Bass Drop ~0.28s)
function generateScratch2() {
  const duration = 0.28;
  const numSamples = Math.floor(sampleRate * duration);
  const header = createWavHeader(numSamples, sampleRate);
  const filter = new BiquadFilter('bandpass', 600, 2.8, sampleRate);
  let phase = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const p = t / duration;

    // Low pitch glide curve
    const speed = p < 0.3 ? 1.4 * Math.sin((p / 0.3) * Math.PI * 0.5) : 1.4 * Math.exp(-(p - 0.3) * 6);
    const freq = Math.max(80, 110 + speed * 450); // Deep pitch range
    filter.setParams('bandpass', freq * 1.8, 2.5, sampleRate);

    phase += (2 * Math.PI * freq) / sampleRate;
    const saw = 2 * ((phase / (2 * Math.PI)) % 1) - 1;
    const sub = Math.sin(phase * 0.5); // Deep sub layer
    const noise = filter.process(Math.random() * 2 - 1);

    // Deep punch transient
    const click = p < 0.08 ? Math.sin(p / 0.08 * Math.PI) * Math.sin(t * 70 * 2 * Math.PI) * 0.8 : 0;
    const env = p < 0.03 ? p / 0.03 : Math.pow(1 - (p - 0.03) / 0.97, 1.5);

    const val = (saw * 0.35 + sub * 0.4 + noise * 0.45 + click) * env * 0.9;
    header.writeInt16LE(Math.floor(Math.max(-1, Math.min(1, val)) * 32767), 44 + i * 2);
  }
  return header;
}

// 3. Long Spinback Rewind (Daha Uzun ve Döner Sürüklenme ~0.38s)
function generateScratch3() {
  const duration = 0.38;
  const numSamples = Math.floor(sampleRate * duration);
  const header = createWavHeader(numSamples, sampleRate);
  const filter = new BiquadFilter('bandpass', 1800, 3.8, sampleRate);
  let phase = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const p = t / duration;

    // Long exponential spinback glide from high to low
    let speed;
    if (p < 0.5) {
      speed = 2.4 * Math.exp(-p * 4.5);
    } else {
      speed = 0.5 + Math.sin(((p - 0.5) / 0.5) * Math.PI) * 0.6;
    }

    const freq = Math.max(120, 220 + speed * 1000);
    filter.setParams('bandpass', freq * 2.2, 3.5, sampleRate);

    phase += (2 * Math.PI * freq) / sampleRate;
    const saw = 2 * ((phase / (2 * Math.PI)) % 1) - 1;
    const noise = filter.process(Math.random() * 2 - 1);

    const env = p < 0.02 ? p / 0.02 : Math.pow(1 - (p - 0.02) / 0.98, 1.4);

    const val = (saw * 0.4 + noise * 0.55) * env * 0.85;
    header.writeInt16LE(Math.floor(Math.max(-1, Math.min(1, val)) * 32767), 44 + i * 2);
  }
  return header;
}

// 4. Bright Zip / High Pitch Scratch (İnce Seri Cırt ~0.20s)
function generateScratch4() {
  const duration = 0.20;
  const numSamples = Math.floor(sampleRate * duration);
  const header = createWavHeader(numSamples, sampleRate);
  const filter = new BiquadFilter('bandpass', 2800, 4.5, sampleRate);
  let phase = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const p = t / duration;

    const speed = p < 0.4 ? Math.sin((p / 0.4) * Math.PI) * 2.2 : 2.2 * Math.pow(1 - (p - 0.4) / 0.6, 3.0);
    const freq = Math.max(300, 600 + speed * 1800); // Bright high range
    filter.setParams('bandpass', freq * 2.4, 4.2, sampleRate);

    phase += (2 * Math.PI * freq) / sampleRate;
    const tri = 2 * Math.abs(2 * ((phase / (2 * Math.PI)) % 1) - 1) - 1;
    const noise = filter.process(Math.random() * 2 - 1);

    const env = p < 0.015 ? p / 0.015 : Math.pow(1 - (p - 0.015) / 0.985, 2.2);

    const val = (tri * 0.45 + noise * 0.55) * env * 0.8;
    header.writeInt16LE(Math.floor(Math.max(-1, Math.min(1, val)) * 32767), 44 + i * 2);
  }
  return header;
}

// 5. Double Flare Scrub (Ritmik Çift Plak Sürtmesi ~0.32s)
function generateScratch5() {
  const duration = 0.32;
  const numSamples = Math.floor(sampleRate * duration);
  const header = createWavHeader(numSamples, sampleRate);
  const filter = new BiquadFilter('bandpass', 1400, 3.5, sampleRate);
  let phase = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const p = t / duration;

    // Double scrub motion curve
    let speed;
    if (p < 0.28) {
      speed = Math.sin((p / 0.28) * Math.PI) * 1.7;
    } else if (p < 0.58) {
      speed = Math.sin(((p - 0.28) / 0.3) * Math.PI) * 2.1;
    } else {
      speed = 2.1 * Math.pow(1 - (p - 0.58) / 0.42, 2.8);
    }

    const freq = Math.max(140, 280 + speed * 1100);
    filter.setParams('bandpass', freq * 2.1, 3.5, sampleRate);

    phase += (2 * Math.PI * freq) / sampleRate;
    const saw = 2 * ((phase / (2 * Math.PI)) % 1) - 1;
    const noise = filter.process(Math.random() * 2 - 1);

    const env = p < 0.02 ? p / 0.02 : Math.pow(1 - (p - 0.02) / 0.98, 1.6);

    const val = (saw * 0.45 + noise * 0.5) * env * 0.85;
    header.writeInt16LE(Math.floor(Math.max(-1, Math.min(1, val)) * 32767), 44 + i * 2);
  }
  return header;
}

const soundsDir = path.join(process.cwd(), 'public', 'sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

fs.writeFileSync(path.join(soundsDir, 'scratch-1.wav'), generateScratch1());
fs.writeFileSync(path.join(soundsDir, 'scratch-2.wav'), generateScratch2());
fs.writeFileSync(path.join(soundsDir, 'scratch-3.wav'), generateScratch3());
fs.writeFileSync(path.join(soundsDir, 'scratch-4.wav'), generateScratch4());
fs.writeFileSync(path.join(soundsDir, 'scratch-5.wav'), generateScratch5());

console.log('Successfully generated 5 distinct DJ vinyl scratch WAV variations in public/sounds/!');
