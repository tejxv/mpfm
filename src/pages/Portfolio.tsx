import React, { useEffect } from "react"
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { MasonryGrid } from "../components/grid/MasonryGrid"
import { ImageUpload } from "../components/upload/ImageUpload"
import { usePortfolioStore } from "../store/portfolioStore"
import { useAuthStore } from "../store/authStore"

const Portfolio = () => {
  const { images, fetchImages, reorderImages } = usePortfolioStore()
  const { user } = useAuthStore()

  useEffect(() => {
    fetchImages()
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id)
      const newIndex = images.findIndex((item) => item.id === over?.id)

      const newImages = arrayMove(images, oldIndex, newIndex)
      reorderImages(newImages)
    }
  }

  return (
    <div className="min-h-screen bg-white px-8 py-8">
      <MasonryGrid images={images} onReorder={handleDragEnd} />
      {user && <ImageUpload />}
    </div>
  )
}

export default Portfolio
