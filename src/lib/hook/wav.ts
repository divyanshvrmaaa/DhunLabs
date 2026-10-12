// Turns a section of a decoded song into a WAV file, in the browser.

/** 16-bit PCM WAV of [start, end) seconds, with a 10 ms fade at each end to avoid clicks. */
export function encodeWav(buf: AudioBuffer, start: number, end: number): Blob {
  const sr = buf.sampleRate;
  const s0 = Math.max(0, Math.floor(start * sr));
  const s1 = Math.min(buf.length, Math.floor(end * sr));
  const n = Math.max(0, s1 - s0);
  const ch = Math.min(2, buf.numberOfChannels);
  const data = Array.from({ length: ch }, (_, c) => buf.getChannelData(c));
  const bytes = 44 + n * ch * 2;
  const view = new DataView(new ArrayBuffer(bytes));
  const str = (o: number, s: string) => [...s].forEach((c, i) => view.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF");
  view.setUint32(4, bytes - 8, true);
  str(8, "WAVE");
  str(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, ch, true);
  view.setUint32(24, sr, true);
  view.setUint32(28, sr * ch * 2, true);
  view.setUint16(32, ch * 2, true);
  view.setUint16(34, 16, true);
  str(36, "data");
  view.setUint32(40, n * ch * 2, true);
  const fade = Math.min(Math.floor(sr * 0.01), Math.floor(n / 2));
  let o = 44;
  for (let i = 0; i < n; i++) {
    const g = i < fade ? i / fade : i >= n - fade ? (n - 1 - i) / fade : 1;
    for (let c = 0; c < ch; c++) {
      const x = Math.max(-1, Math.min(1, data[c][s0 + i] * g));
      view.setInt16(o, x < 0 ? x * 0x8000 : x * 0x7fff, true);
      o += 2;
    }
  }
  return new Blob([view.buffer], { type: "audio/wav" });
}
