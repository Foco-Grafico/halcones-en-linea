'use client'

import { login } from '../../../services/supabase/actions/auth'
import { useState } from 'react'

export const LoginForm = () => {
  const [err, setErr] = useState<null | string>(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)

    login(
      form.get('email') as string,
      form.get('password') as string
    )
      .catch((err: Error) => {
        setErr(err.message)
      })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='p-5 flex flex-col gap-6 justify-center items-center'
    >
      <div className='flex flex-row rounded-full bg-[#417ab1] items-center px-5 gap-5'>
        <img src='/user.svg' alt='' className='h-10 w-10' />
        <input
          type='text'
          className='font-thin h-14 bg-[#417ab1] placeholder-white outline-none'
          name='email'
          placeholder='Usuario'
        />
      </div>
      <div className='flex flex-row rounded-full bg-[#417ab1] items-center px-5 gap-5'>
        <img src='/upload.svg' className='h-10 w-10' alt='' />
        <input
          type='password'
          className='font-thin bg-[#417ab1] h-14 placeholder-white  outline-none'
          name='password'
          placeholder='Contraseña'
        />
      </div>
      <button className='bg-[#8ea9c6] h-14 w-full rounded-full'>
        Ingresar
      </button>

      {err != null && <p id='paragraph-error' className='text-red-500'>{err}</p>}
    </form>
  )
}
