'use server'

import { supabase as supabaseAdmin } from './supabase';
import { createClient } from './supabase/server';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';
import nodemailer from 'nodemailer';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export const fetchPackages = cache(async () => {
  const { data, error } = await supabaseAdmin
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching packages:', error);
    return { success: false, data: [] };
  }

  return { success: true, data: data || [] };
});

export const fetchPackageById = cache(async (id: string) => {
  const { data, error } = await supabaseAdmin
    .from('packages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching package:', error);
    return { success: false, data: null };
  }

  return { success: true, data };
});

export async function addPackage(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const kshPrice = parseFloat(formData.get('kshPrice') as string);
  const usdPrice = parseFloat(formData.get('usdPrice') as string);
  const duration = formData.get('duration') as string;
  const category = formData.get('category') as string;
  const image = formData.get('image') as File;

  let imageUrl = null;

  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `packages/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('package-images')
      .upload(filePath, image);

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      return { success: false, error: 'Failed to upload image' };
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('package-images')
      .getPublicUrl(filePath);

    imageUrl = publicUrl;
  }

  const { error } = await supabaseAdmin
    .from('packages')
    .insert([{
      title,
      description,
      ksh_price: kshPrice,
      usd_price: usdPrice,
      duration,
      category,
      image_url: imageUrl,
    }]);

  if (error) {
    console.error('Insert Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('--- NEW CONTACT SUBMISSION ---');
      console.log(`From: ${name} (${email})`);
      console.log(`Message: ${message}`);
      console.log('------------------------------');
      console.log('NOTE: SMTP credentials not found in .env.local, email not actually sent.');
      return { success: true };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: 'info@fextysafaris.co.ke',
      subject: `New Contact Inquiry from ${name}`,
      text: message,
      html: `
        <h3>New Inquiry from Fexty Safaris Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: 'Failed to send email. Please try again later.' };
  }
}
