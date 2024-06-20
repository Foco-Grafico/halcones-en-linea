import { revalidatePath } from 'next/cache'
import { supabase } from '../client'
import { USER_TYPES } from './types'

interface RegisterProps {
  email: string
  password: string
  phone: string
  firstName: string
  lastName: string
  role: number
  birthdate: Date
}

export const register = async ({ email, password, phone, birthdate, firstName, lastName, role }: RegisterProps) => {
  await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        phone,
        birthdate: birthdate.toISOString(),
        first_name: firstName,
        last_name: lastName,
        role
      }
    }
  })
    .then(({ data, error }) => {
      if (error != null) {
        throw new Error(error.message)
      }
      return data
    })

  const revalidateOptions = {
    [USER_TYPES.STUDENT]: () => revalidatePath('/admin/students'),
    [USER_TYPES.PROFESSOR]: () => revalidatePath('/admin/professor'),
    [USER_TYPES.COORDINATOR]: () => revalidatePath('/admin/coordinators')
  }

  revalidateOptions[role]()
}
