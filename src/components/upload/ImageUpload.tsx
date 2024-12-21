import React from 'react';
import { Upload } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';

export const ImageUpload: React.FC = () => {
  const { handleUpload } = useImageUpload();

  return (
    <div className="fixed bottom-8 right-8">
      <label className="flex items-center justify-center w-12 h-12 bg-black active:scale-90 text-white rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          multiple
          className="hidden"
        />
        <Upload size={20} />
      </label>
    </div>
  );
};