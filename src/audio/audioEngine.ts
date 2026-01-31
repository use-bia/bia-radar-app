import { SOUND_MAP, type SoundName } from "./soundMap";

class AudioEngine {
  private sounds = new Map<SoundName, HTMLAudioElement>();
  private enabled = true;
  private volume = 0.4;
  private initialized = false;

  init() {
    if (this.initialized) return;

    (Object.keys(SOUND_MAP) as SoundName[]).forEach((name) => {
      const audio = new Audio(SOUND_MAP[name]);
      audio.preload = "auto";
      audio.volume = this.volume;
      this.sounds.set(name, audio);
    });

    this.initialized = true;
  }

  play(name: SoundName) {
    if (!this.enabled) return;

    const audio = this.sounds.get(name);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  setEnabled(value: boolean) {
    this.enabled = value;
  }

  setVolume(value: number) {
    this.volume = value;
    this.sounds.forEach((a) => (a.volume = value));
  }
}

export const audioEngine = new AudioEngine();
