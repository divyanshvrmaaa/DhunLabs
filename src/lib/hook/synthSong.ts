// A made-up test song for the Hook Finder: quiet intro, loud chorus, verse,
// the SAME chorus again, quiet outro. Used by the tests and the demo WAV.
export const SYNTH_SECTIONS = [
  { name: "intro", from: 0, to: 30 },
  { name: "chorus", from: 30, to: 45 },
  { name: "verse", from: 45, to: 70 },
  { name: "chorus", from: 70, to: 85 },
  { name: "outro", from: 85, to: 100 },
] as const;

export function synthSong(sr = 11025): Float32Array {
  const total = 100;
  const x = new Float32Array(sr * total);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const chord = (t: number, notes: number[], amp: number) => notes.reduce((s, f) => s + Math.sin(2 * Math.PI * f * t), 0) * (amp / notes.length);
  const chorusChords = [
    [261.6, 329.6, 392.0],
    [196.0, 246.9, 293.7],
    [220.0, 261.6, 329.6],
    [174.6, 220.0, 261.6],
  ];
  const verseChords = [
    [293.7, 349.2, 440.0],
    [329.6, 392.0, 493.9],
  ];
  for (let i = 0; i < x.length; i++) {
    const t = i / sr;
    let v = 0;
    if (t < 30 || t >= 85) {
      v = chord(t, [164.8, 207.7, 246.9], 0.04); // soft pad
    } else if ((t >= 30 && t < 45) || (t >= 70 && t < 85)) {
      const local = t >= 70 ? t - 70 : t - 30; // identical chorus both times
      v = chord(t, chorusChords[Math.floor(local) % 4], 0.45);
      const beat = local % 0.25; // drum hit every 0.25 s
      if (beat < 0.05) v += rnd() * 0.6 * (1 - beat / 0.05);
    } else {
      const local = t - 45;
      v = chord(t, verseChords[Math.floor(local / 2) % 2], 0.2);
      const beat = local % 1; // sparser hits
      if (beat < 0.04) v += rnd() * 0.25 * (1 - beat / 0.04);
    }
    x[i] = v;
  }
  return x;
}
