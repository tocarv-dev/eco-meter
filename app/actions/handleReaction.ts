'use server';

import { addReaction } from '@/lib/utils/db';
import { revalidatePath } from 'next/cache';

export async function handleReaction(id: string, reaction: string) {
  try {
    await addReaction(id, reaction);
    revalidatePath(`/results/${id}/tips`);
  } catch (error) {
    console.error('Failed to add reaction:', error);
  }
}