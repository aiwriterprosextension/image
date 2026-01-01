import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { IMAGE_SIZES, CATEGORIES } from '../constants/imageSizes';
import { ImageSize } from '../types';

interface SizeSelectorProps {
  selectedSizes: string[];
  onSizeToggle: (sizeId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export default function SizeSelector({
  selectedSizes,
  onSizeToggle,
  onSelectAll,
  onClearAll
}: SizeSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    CATEGORIES
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getSizesByCategory = (category: string): ImageSize[] => {
    return IMAGE_SIZES.filter(size => size.category === category);
  };

  const getCategorySelectedCount = (category: string): number => {
    return getSizesByCategory(category).filter(size =>
      selectedSizes.includes(size.id)
    ).length;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Select Sizes ({selectedSizes.length} selected)
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onSelectAll}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Select All
          </button>
          <button
            onClick={onClearAll}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {CATEGORIES.map(category => {
          const sizes = getSizesByCategory(category);
          const selectedCount = getCategorySelectedCount(category);
          const isExpanded = expandedCategories.includes(category);

          return (
            <div
              key={category}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isExpanded ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                  <span className="font-medium text-gray-800">{category}</span>
                  <span className="text-sm text-gray-500">
                    ({selectedCount}/{sizes.length})
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="p-2 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sizes.map(size => {
                      const isSelected = selectedSizes.includes(size.id);

                      return (
                        <button
                          key={size.id}
                          onClick={() => onSizeToggle(size.id)}
                          className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                              isSelected
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 text-sm">
                              {size.name}
                            </p>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {size.width} × {size.height}px
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {size.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
