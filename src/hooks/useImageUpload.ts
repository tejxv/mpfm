import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { usePortfolioStore } from '../store/portfolioStore';

export const useImageUpload = () => {
  const { user } = useAuthStore();
  const { addImage, images } = usePortfolioStore();

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      const { data, error } = await supabase.from('images').insert({
        url: publicUrl,
        position: images.length,
        user_id: user.id,
      }).select().single();

      if (error) throw error;
      if (data) addImage(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }, [user, images.length, addImage]);

  return { handleUpload };
};