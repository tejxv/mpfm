import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { usePortfolioStore } from '../store/portfolioStore';

export const useImageUpload = () => {
  const { user } = useAuthStore();
  const { addImage, images } = usePortfolioStore();

  const uploadSingleImage = async (file: File, position: number) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user!.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    const { data, error } = await supabase.from('images').insert({
      url: publicUrl,
      position: position,
      user_id: user!.id,
    }).select().single();

    if (error) throw error;
    return data;
  };

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !user) return;

    try {
      const startPosition = images.length;
      const uploadPromises = files.map((file, index) => 
        uploadSingleImage(file, startPosition + index)
      );

      const uploadedImages = await Promise.all(uploadPromises);
      uploadedImages.forEach(image => {
        if (image) addImage(image);
      });
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }, [user, images.length, addImage]);

  return { handleUpload };
};