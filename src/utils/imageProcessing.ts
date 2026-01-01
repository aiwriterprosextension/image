import { removeBackground } from '@imgly/background-removal';
import { ImageSize, ProcessedImage } from '../types';
import { generateSEOFilename } from './fileNaming';

export async function removeImageBackground(imageBlob: Blob): Promise<Blob> {
  const result = await removeBackground(imageBlob);
  return result;
}

export function resizeImage(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  const sourceAspect = image.width / image.height;
  const targetAspect = targetWidth / targetHeight;

  let sx = 0, sy = 0, sw = image.width, sh = image.height;

  if (sourceAspect > targetAspect) {
    sw = image.height * targetAspect;
    sx = (image.width - sw) / 2;
  } else {
    sh = image.width / targetAspect;
    sy = (image.height - sh) / 2;
  }

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);

  return canvas;
}

export async function processImage(
  imageFile: File,
  size: ImageSize,
  removeBackground: boolean,
  baseName: string
): Promise<ProcessedImage> {
  let processedBlob: Blob = imageFile;

  if (removeBackground) {
    processedBlob = await removeImageBackground(imageFile);
  }

  const img = await loadImage(processedBlob);
  const canvas = resizeImage(img, size.width, size.height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to create blob'));
      },
      'image/png',
      1.0
    );
  });

  const filename = generateSEOFilename(
    baseName,
    size.width,
    size.height,
    removeBackground
  );

  const dataUrl = URL.createObjectURL(blob);

  return {
    size,
    blob,
    filename,
    dataUrl
  };
}

function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}
