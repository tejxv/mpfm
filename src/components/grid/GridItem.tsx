import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Image } from "../../types/image"
import { Trash2 } from "lucide-react"

interface GridItemProps {
  image: Image
  user: any
  isEditMode: boolean
  onDelete: (id: string) => void
}

export const GridItem: React.FC<GridItemProps> = ({
  image,
  user,
  isEditMode,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(user && isEditMode ? attributes : {})}
      {...(user && isEditMode ? listeners : {})}
      className={`relative w-full h-min p-4 md:p-6 ${
        user && isEditMode ? "cursor-move border hover:bg-slate-100" : ""
      } ${isDragging ? "shadow-2xl" : ""}`}
    >
      <div
        className={`relative aspect-auto transition-all overflow-hidden ${
          isEditMode ? "animate-wiggle" : ""
        }`}
      >
        <img
          src={image.url}
          alt="Portfolio"
          className="w-full h-min object-contain"
          loading="lazy"
        />
        {user && (
          <div className="w-full mt-4 h-10 border bg-white hover:bg-red-500 border-gray-200 flex justify-between items-center">
            <button
              onClick={() => onDelete(image.id)}
              className="w-full h-full flex justify-center items-center"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
