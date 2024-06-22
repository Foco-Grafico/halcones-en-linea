'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '../actions'

export const getGroups = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('groups').select('id, name, created_at, careers(id, name)')

  if (error != null) {
    console.error('Error getting groups:', error)
    throw new Error('Error getting groups')
  }

  return data
}

export const getGroupsByCareer = async (careerId: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('groups').select('id, name, created_at').eq('career', careerId)

  if (error != null) {
    console.error('Error getting groups:', error)
    throw new Error('Error getting groups')
  }

  return data
}

export const createGroup = async (data: FormData) => {
  const supabase = await createClient()

  const entries = Object.fromEntries(data.entries())

  await supabase.from('groups').insert({
    name: z.coerce.string().parse(entries.name),
    career: z.coerce.number().parse(entries.career)
  })

  revalidatePath('/admin/groups')
  redirect('/admin/groups')
}

export const getGroupById = async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('groups').select('id, name, created_at, careers(id, name)').eq('id', id).single()

  if (error != null) {
    console.error('Error getting group:', error)
    throw new Error('Error getting group')
  }

  return data
}
