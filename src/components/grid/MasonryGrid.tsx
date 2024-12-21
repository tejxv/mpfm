import React, { useState }  from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Image } from '../../types/image';
import { GridItem } from './GridItem'; // Ensure you have this import
import { useAuthStore } from '../../store/authStore';
import { usePortfolioStore } from '../../store/portfolioStore';

interface MasonryGridProps {
  images: Image[];
  onReorder: (event: DragEndEvent) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ images, onReorder }) => {
  const { user } = useAuthStore();
  const { deleteImage } = usePortfolioStore();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = async (imageId: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await deleteImage(imageId);
    }
  };

  return (
    <div className="space-y-4">
    {user && (
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-4 py-2 rounded-md transition-colors ${
            isEditMode 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {isEditMode ? 'Apply changes' : 'Rearrange Images'}
        </button>
      </div>
    )}
    <DndContext collisionDetection={closestCenter} onDragEnd={onReorder}>
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image) => (
            <GridItem key={image.id} image={image} user={user} isEditMode={isEditMode} onDelete={handleDelete} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
    </div>
  );
};