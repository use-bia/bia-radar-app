export const SOUND_MAP = {
  toggle_theme: "/sounds/switch26.ogg",
  toggle_sound: "/sounds/switch26.ogg",
  switch_tabs: "/sounds/drop_003.ogg",
} as const;

export type SoundName = keyof typeof SOUND_MAP;
