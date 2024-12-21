import React from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Image } from '../../types/image';
import { GridItem } from './GridItem'; // Ensure you have this import
import { useAuthStore } from '../../store/authStore';

interface MasonryGridProps {
  images: Image[];
  onReorder: (event: DragEndEvent) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ images, onReorder }) => {
  const { user } = useAuthStore();

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onReorder}>
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image) => (
            <GridItem key={image.id} image={image} user={user} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};