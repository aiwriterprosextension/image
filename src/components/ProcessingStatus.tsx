import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  progress: number;
  total: number;
  currentTask: string;
  error: string | null;
}

export default function ProcessingStatus({
  isProcessing,
  progress,
  total,
  currentTask,
  error
}: ProcessingStatusProps) {
  if (!isProcessing && !error) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        {error ? (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Processing Failed
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : isProcessing ? (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Processing Images
            </h3>
            <p className="text-gray-600 mb-4">{currentTask}</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(progress / total) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              {progress} of {total} images processed
            </p>
          </div>
        ) : (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Processing Complete
            </h3>
            <p className="text-gray-600">All images have been processed successfully</p>
          </div>
        )}
      </div>
    </div>
  );
}
