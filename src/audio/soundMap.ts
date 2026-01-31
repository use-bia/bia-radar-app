export const SOUND_MAP = {
  toggle_theme: "/sounds/switch26.ogg",
  toggle_sound: "/sounds/switch26.ogg",
} as const;

export type SoundName = keyof typeof SOUND_MAP;
