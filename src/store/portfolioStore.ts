import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Image } from '../types/image';

interface PortfolioState {
  images: Image[];
  setImages: (images: Image[]) => void;
  addImage: (image: Image) => void;
  reorderImages: (images: Image[]) => void;
  fetchImages: () => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  images: [],
  setImages: (images) => set({ images }),
  addImage: (image) => set((state) => ({ images: [...state.images, image] })),
  reorderImages: async (images) => {
    set({ images });
    // Update positions in database
    for (let i = 0; i < images.length; i++) {
      await supabase
        .from('images')
        .update({ position: i })
        .eq('id', images[i].id);
    }
  },
  fetchImages: async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('position');
    
    if (error) {
      console.error('Error fetching images:', error);
      return;
    }
    
    set({ images: data });
  },
  deleteImage: async (id) => {
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting image:', error);
      return;
    }
    
    set((state) => ({
      images: state.images.filter(img => img.id !== id)
    }));
  },
}));