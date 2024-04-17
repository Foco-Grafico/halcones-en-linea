'use client'

import { H1 } from '@/components/utils'
import { createActivityStore } from '@/stores/create-activity'

const Headers = {
  trivia: () => (
    <header
      className='border-b pb-4 px-14 mb-10'
    >
      <H1
        className='text-[#cdcccb] border-b w-fit'
      >
        Arma tu trivia
      </H1>

      <span className='text-white font-bold text-lg'>
        Sigue las instrucciones en cada apartado para completar y asignar la trivia a tus alumnos correctamente.
      </span>
    </header>
  ),
  exam: () => (
    <header
      className='border-b pb-4 px-14 mb-10'
    >
      <H1
        className='text-[#cdcccb] border-b w-fit'
      >
        Crea tu examen
      </H1>

      <span className='text-white font-bold text-lg'>
        Selecciona el examen a crear
      </span>
    </header>
  ),
  questionary: () => (
    <header
      className='border-b pb-4 px-14 mb-10'
    >
      <H1
        className='text-[#cdcccb] border-b w-fit'
      >
        Crea tu cuestionario
      </H1>

      <span className='text-white font-bold text-lg'>
        Selecciona el cuestionario a crear
      </span>
    </header>
  ),
  work: () => (
    <header
      className='border-b pb-4 px-14 mb-10'
    >
      <H1
        className='text-[#cdcccb] border-b w-fit'
      >
        Crea tu trabajo
      </H1>

      <span className='text-white font-bold text-lg'>
        Selecciona el trabajo a crear
      </span>
    </header>
  ),
  default: () => (
    <header
      className='border-b pb-4 px-14 mb-10'
    >
      <H1
        className='text-[#cdcccb] border-b w-fit'
      >
        Crea tu actividad
      </H1>

      <span className='text-white font-bold text-lg'>
        Selecciona la actividad a crear para la trivia
      </span>
    </header>
  )
}

export const ActivityHeader = () => {
  const type = createActivityStore(state => state.config.type)

  const Header = type == null ? Headers.default : Headers[type]

  return <Header />
}
