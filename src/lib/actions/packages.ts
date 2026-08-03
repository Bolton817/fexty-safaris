'use server'

import { supabase as supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createPackage(data: any) {
  try {
    const { error } = await supabaseAdmin
      .from('packages')
      .insert([
        {
          title: data.title,
          description: data.description,
          ksh_price: parseFloat(data.ksh_price),
          usd_price: parseFloat(data.usd_price),
          duration: data.duration,
          category: data.category,
          image_url: data.image_url,
          inclusions: data.inclusions,
          exclusions: data.exclusions,
          itinerary: data.itinerary,
        }
      ]);

    if (error) {
      console.error('Insert Error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (err: any) {
    console.error('Action Error:', err);
    return { success: false, error: err.message || 'Unknown error occurred' };
  }
}

export async function updatePackage(id: string, data: any) {
  try {
    const { error } = await supabaseAdmin
      .from('packages')
      .update({
        title: data.title,
        description: data.description,
        ksh_price: parseFloat(data.ksh_price),
        usd_price: parseFloat(data.usd_price),
        duration: data.duration,
        category: data.category,
        image_url: data.image_url,
        inclusions: data.inclusions,
        exclusions: data.exclusions,
        itinerary: data.itinerary,
      })
      .eq('id', id);

    if (error) {
      console.error('Update Error:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (err: any) {
    console.error('Action Error:', err);
    return { success: false, error: err.message || 'Unknown error occurred' };
  }
}

export async function deletePackage(id: string) {
  try {
    // 1. Fetch package to get image URL
    const { data: pkg, error: fetchError } = await supabaseAdmin
      .from('packages')
      .select('image_url')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Fetch Error before delete:', fetchError);
      return { success: false, error: fetchError.message };
    }

    // 2. Extract filename and delete from storage
    if (pkg && pkg.image_url) {
      const urlParts = pkg.image_url.split('/package-images/');
      if (urlParts.length > 1) {
        const fileName = urlParts[1]; // Get everything after the bucket name
        
        const { error: storageError } = await supabaseAdmin.storage
          .from('package-images')
          .remove([fileName]);
          
        if (storageError) {
          console.warn('Could not delete image from storage:', storageError.message);
          // We don't abort deletion if storage cleanup fails, just log it.
        }
      }
    }

    // 3. Delete from database
    const { error: deleteError } = await supabaseAdmin
      .from('packages')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Delete Error:', deleteError);
      return { success: false, error: deleteError.message };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (err: any) {
    console.error('Action Error:', err);
    return { success: false, error: err.message || 'Unknown error occurred' };
  }
}
