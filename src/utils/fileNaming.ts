export function generateSEOFilename(
  baseName: string,
  width: number,
  height: number,
  removeBackground: boolean
): string {
  const sanitized = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const bgSuffix = removeBackground ? '-no-bg' : '';
  const sizePart = `${width}x${height}`;

  return `${sanitized}-${sizePart}${bgSuffix}.png`;
}

export function generateBaseName(originalFilename: string): string {
  return originalFilename
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
