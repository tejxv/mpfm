import React from "react"
import { Upload } from "lucide-react"
import { useImageUpload } from "../../hooks/useImageUpload"

export const ImageUpload: React.FC = () => {
  const { handleUpload } = useImageUpload()

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      <label className="flex items-center justify-center transition-all w-20 h-12 drop-shadow-lg bg-black active:scale-90 text-white rounded-full cursor-pointer hover:bg-gray-800">
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
  )
}
