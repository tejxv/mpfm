import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Image } from '../../types/image';

interface GridItemProps {
  image: Image;
  user: any;
  isEditMode: boolean;
}

export const GridItem: React.FC<GridItemProps> = ({ image, user, isEditMode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(user && isEditMode ? attributes : {})}
      {...(user && isEditMode ? listeners : {})}
      className={`relative border w-full h-min p-4 md:p-6 ${
        isEditMode ? 'cursor-move' : ''
      }`}
    >
      <div className={`relative aspect-auto overflow-hidden ${isEditMode ? 'animate-wiggle' : ''}`}>
        <img
          src={image.url}
          alt="Portfolio"
          className="w-full h-min object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};