export interface ImageSize {
  id: string;
  name: string;
  width: number;
  height: number;
  category: string;
  description: string;
}

export interface ProcessedImage {
  size: ImageSize;
  blob: Blob;
  filename: string;
  dataUrl: string;
}

export interface ProcessingOptions {
  removeBackground: boolean;
  selectedSizes: string[];
  baseName: string;
}
