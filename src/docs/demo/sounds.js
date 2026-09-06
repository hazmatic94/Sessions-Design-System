export function playDocsSound(src) {
  const audio = new Audio(src);
  audio.play().catch(() => {});
}
