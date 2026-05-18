const AUDIO_BASE = 'https://themes.pixelwars.org/unrovr/demo-01/wp-content/themes/unrovr/audio';

const clips = {
  tick: `${AUDIO_BASE}/tick.mp3`,
  wind: `${AUDIO_BASE}/wind.mp3`,
  windReverse: `${AUDIO_BASE}/wind-reverse.mp3`,
};

const pool = new Map();

function getAudio(name) {
  if (!pool.has(name)) {
    const audio = new Audio(clips[name]);
    audio.preload = 'auto';
    pool.set(name, audio);
  }
  return pool.get(name).cloneNode();
}

export function playSound(name, volume = 0.45) {
  try {
    const audio = getAudio(name);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play()?.catch(() => {});
  } catch {}
}
