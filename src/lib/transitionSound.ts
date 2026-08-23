// DJ Vinyl Scratch Sound Engine with 5 Random Variations for CLTR

export type ScratchStyle = 0 | 1 | 2 | 3 | 4;

class DJScratchSoundEngine {
  private ctx: AudioContext | null = null;
  private buffers: (AudioBuffer | null)[] = [null, null, null, null, null];
  private isMuted: boolean = false;
  private isLoaded: boolean = false;
  private lastIndex: number = -1;

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public preload() {
    try {
      const ctx = this.initContext();

      const loadFile = async (url: string): Promise<AudioBuffer | null> => {
        try {
          const res = await fetch(url);
          const arrayBuffer = await res.arrayBuffer();
          return await ctx.decodeAudioData(arrayBuffer);
        } catch {
          return null;
        }
      };

      const urls = [
        "/sounds/scratch-1.wav",
        "/sounds/scratch-2.wav",
        "/sounds/scratch-3.wav",
        "/sounds/scratch-4.wav",
        "/sounds/scratch-5.wav",
      ];

      Promise.all(urls.map((url) => loadFile(url))).then((decoded) => {
        this.buffers = decoded;
        this.isLoaded = true;
      });
    } catch {
      /* ignore */
    }
  }

  public unlock() {
    try {
      const ctx = this.initContext();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      if (!this.isLoaded) {
        this.preload();
      }
    } catch {
      /* ignore */
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play a random DJ scratch variation (0: Snappy, 1: Deep Drop, 2: Long Spinback, 3: Bright Zip, 4: Double Flare)
   */
  public playScratch(forcedIndex?: number) {
    if (this.isMuted) return;

    try {
      const ctx = this.initContext();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Select a random variation, avoiding immediate back-to-back repetition
      let idx: number;
      if (typeof forcedIndex === "number" && forcedIndex >= 0 && forcedIndex < 5) {
        idx = forcedIndex;
      } else {
        do {
          idx = Math.floor(Math.random() * 5);
        } while (idx === this.lastIndex && Math.random() > 0.1);
      }
      this.lastIndex = idx;

      const buffer = this.buffers[idx];

      if (buffer) {
        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.72, ctx.currentTime);

        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);
      } else {
        // Dynamic Web Audio Synthesizer Fallback for index
        this.synthScratchVariation(ctx, idx);
      }
    } catch {
      /* ignore */
    }
  }

  private synthScratchVariation(ctx: AudioContext, variation: number) {
    const now = ctx.currentTime;
    
    // Duration per variation
    const durations = [0.22, 0.28, 0.38, 0.20, 0.32];
    const duration = durations[variation] || 0.25;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.68, now + 0.012);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";

    const osc = ctx.createOscillator();
    osc.type = "sawtooth";

    if (variation === 0) {
      // 0: Snappy Chirp
      filter.Q.setValueAtTime(3.5, now);
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
      filter.frequency.exponentialRampToValueAtTime(300, now + duration);

      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(150, now + duration);
    } else if (variation === 1) {
      // 1: Deep Kalın Drop
      filter.Q.setValueAtTime(2.5, now);
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(1100, now + 0.09);
      filter.frequency.exponentialRampToValueAtTime(120, now + duration);

      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.09);
      osc.frequency.exponentialRampToValueAtTime(70, now + duration);
    } else if (variation === 2) {
      // 2: Long Spinback
      filter.Q.setValueAtTime(3.8, now);
      filter.frequency.setValueAtTime(3800, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.16);
      filter.frequency.exponentialRampToValueAtTime(1200, now + duration);

      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(900, now + duration);
    } else if (variation === 3) {
      // 3: Bright High Zip
      filter.Q.setValueAtTime(4.5, now);
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(4500, now + 0.07);
      filter.frequency.exponentialRampToValueAtTime(800, now + duration);

      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.07);
      osc.frequency.exponentialRampToValueAtTime(300, now + duration);
    } else {
      // 4: Double Flare
      filter.Q.setValueAtTime(3.5, now);
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(3000, now + 0.09);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 0.18);
      filter.frequency.exponentialRampToValueAtTime(250, now + duration);

      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.09);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(140, now + duration);
    }

    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.45, now);

    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "sine";
    clickOsc.frequency.setValueAtTime(variation === 1 ? 90 : 150, now);
    clickOsc.frequency.exponentialRampToValueAtTime(25, now + 0.025);
    clickGain.gain.setValueAtTime(0.65, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    noise.connect(filter);
    osc.connect(oscGain);
    oscGain.connect(filter);
    filter.connect(masterGain);

    clickOsc.connect(clickGain);
    clickGain.connect(masterGain);

    masterGain.connect(ctx.destination);

    osc.start(now);
    noise.start(now);
    clickOsc.start(now);

    osc.stop(now + duration);
    noise.stop(now + duration);
    clickOsc.stop(now + duration);
  }
}

export const transitionSound = new DJScratchSoundEngine();
