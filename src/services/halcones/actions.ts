'use server'
import { cookies } from 'next/headers'
import { API } from './halcones-db'
import { UserSchema, UserTypes } from './types'
import { foundUserRedirect } from './utils'
import { redirect } from 'next/navigation'

export const login = async (data: FormData) => {
  const res = await fetch(API + '/auth/login', {
    method: 'POST',
    body: data
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Credenciales incorrectas')
    }

    throw new Error('Error al iniciar sesión')
  }

  const user = UserSchema.parse(await res.json())

  cookies().set('token', user.token)

  redirect(foundUserRedirect(user.user_type as UserTypes))

  return user
}

export const logout = async () => {
  cookies().delete('token')

  redirect('/login')
}

export const recoverAccount = async (token: string) => {
  const res = await fetch(API + `/auth/recover?token=${token}`)

  if (!res.ok) {
    throw new Error('Error al recuperar cuenta')
  }

  const user = UserSchema.parse(await res.json())

  return user
}