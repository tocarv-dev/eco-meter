'use server';

import { registerSurvey } from '@/lib/utils/db';
import { revalidatePath } from 'next/cache';

export async function handleRegister(id: string, email: string) {
  try {
    await registerSurvey(id, email);
    revalidatePath(`/`);
  } catch (error) {
    console.error('Failed to register:', error);
  }
}