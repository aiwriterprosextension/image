import { useState } from 'react';
import { Image as ImageIcon, Settings } from 'lucide-react';
import JSZip from 'jszip';
import ImageUploader from './components/ImageUploader';
import SizeSelector from './components/SizeSelector';
import ProcessingStatus from './components/ProcessingStatus';
import ResultsGallery from './components/ResultsGallery';
import { ProcessedImage } from './types';
import { IMAGE_SIZES } from './constants/imageSizes';
import { processImage } from './utils/imageProcessing';
import { generateBaseName } from './utils/fileNaming';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ProcessedImage[]>([]);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResults([]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreview(null);
    setResults([]);
    setSelectedSizes([]);
    setError(null);
  };

  const handleSizeToggle = (sizeId: string) => {
    setSelectedSizes(prev =>
      prev.includes(sizeId)
        ? prev.filter(id => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSizes(IMAGE_SIZES.map(size => size.id));
  };

  const handleClearAll = () => {
    setSelectedSizes([]);
  };

  const handleProcess = async () => {
    if (!selectedImage || selectedSizes.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResults([]);

    const baseName = generateBaseName(selectedImage.name);
    const processedResults: ProcessedImage[] = [];

    try {
      for (let i = 0; i < selectedSizes.length; i++) {
        const sizeId = selectedSizes[i];
        const size = IMAGE_SIZES.find(s => s.id === sizeId);
        if (!size) continue;

        setCurrentTask(`Processing ${size.name}...`);

        const result = await processImage(
          selectedImage,
          size,
          removeBackground,
          baseName
        );

        processedResults.push(result);
        setProgress(i + 1);
      }

      setResults(processedResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process images');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = (result: ProcessedImage) => {
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    if (results.length === 0) return;

    const zip = new JSZip();

    results.forEach(result => {
      zip.file(result.filename, result.blob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generateBaseName(selectedImage?.name || 'images')}-resized.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const canProcess = selectedImage && selectedSizes.length > 0 && !isProcessing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ImageIcon className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Image Resizer Pro
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Resize images to multiple sizes with optional background removal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-blue-600" />
              Upload Image
            </h2>
            <ImageUploader
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              preview={preview}
              onClear={handleClear}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-600" />
              Options
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={removeBackground}
                    onChange={(e) => setRemoveBackground(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium text-gray-800">
                      Remove Background
                    </span>
                    <p className="text-sm text-gray-500">
                      Automatically remove the background from all resized images
                    </p>
                  </div>
                </label>
              </div>

              <button
                onClick={handleProcess}
                disabled={!canProcess}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all shadow-lg ${
                  canProcess
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Process Images'}
              </button>

              {selectedImage && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {selectedSizes.length === 0
                      ? 'Select at least one size below'
                      : `${selectedSizes.length} size${selectedSizes.length !== 1 ? 's' : ''} selected`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedImage && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <SizeSelector
              selectedSizes={selectedSizes}
              onSizeToggle={handleSizeToggle}
              onSelectAll={handleSelectAll}
              onClearAll={handleClearAll}
            />
          </div>
        )}

        <ResultsGallery
          results={results}
          onDownloadAll={handleDownloadAll}
          onDownloadSingle={handleDownloadSingle}
        />

        <ProcessingStatus
          isProcessing={isProcessing}
          progress={progress}
          total={selectedSizes.length}
          currentTask={currentTask}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
