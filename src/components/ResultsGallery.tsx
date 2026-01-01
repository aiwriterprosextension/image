import { Download, FileDown } from 'lucide-react';
import JSZip from 'jszip';
import { ProcessedImage } from '../types';

interface ResultsGalleryProps {
  results: ProcessedImage[];
  onDownloadAll: () => void;
  onDownloadSingle: (result: ProcessedImage) => void;
}

export default function ResultsGallery({
  results,
  onDownloadAll,
  onDownloadSingle
}: ResultsGalleryProps) {
  if (results.length === 0) return null;

  const totalSize = results.reduce((sum, r) => sum + r.blob.size, 0);

  return (
    <div className="w-full mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Processed Images ({results.length})
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Total size: {(totalSize / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <button
          onClick={onDownloadAll}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          <FileDown className="w-5 h-5" />
          Download All as ZIP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center p-4">
              <img
                src={result.dataUrl}
                alt={result.filename}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-800 text-sm mb-1 truncate">
                {result.filename}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {result.size.width} × {result.size.height}px • {' '}
                {(result.blob.size / 1024).toFixed(0)} KB
              </p>
              <button
                onClick={() => onDownloadSingle(result)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
