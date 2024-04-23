import Link from 'next/link'
import { DisplayActivities } from './get-activities'
import { Main } from '@/components/utils'

export default async function Activities ({ params, searchParams }) {
  const newSearchParams = new URLSearchParams(searchParams)

  return (
    <Main className='flex flex-col gap-5'>
      <header className='flex flex-row gap-2'>
        <div className='bg-white text-[#21264a] rounded-md px-2'>
          Mis actividades
        </div>
        <Link
          href={`/professor/create-activity?${newSearchParams.toString()}`}
        >
          <div className='text-white bg-[#1264ac] rounded-full justify-center items-center flex w-7 h-7'>+</div>
        </Link>
      </header>
      <DisplayActivities params={params} searchParams={searchParams} />
    </Main>
  )
}
