import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Image } from '../../types/image';

interface GridItemProps {
  image: Image;
  user: any
}

export const GridItem: React.FC<GridItemProps> = ({ image, user }) => {
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
      {...(user ? attributes : {})}
      {...(user ? listeners : {})}
      className={`relative aspect-[3/4] group ${user ? 'cursor-move' : ''}`}
    >
      <img
        src={image.url}
        alt="Portfolio"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-black opacity-0 ${user ? 'group-hover:opacity-5' : ''} transition-opacity duration-300`} />
    </div>
  );
};