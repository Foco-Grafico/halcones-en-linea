import { H1, Main, RedirectPlus, THeadSticky, Table, TableContainer, Td, Th, Tr } from '@/components/utils'
import { getProfessors } from '@/services/supabase/actions'
import { dateFormatter } from '@/utils/formatters'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

export default async function ProfessorPage () {
  const professors = await getProfessors()

  return (
    <Main>
      <div className='flex items-center justify-between mb-4'>
        <H1 className='text-white'>Profesores</H1>

        <RedirectPlus href='/admin/professor/new' />
      </div>

      <TableContainer>
        <Table>
          <THeadSticky>
            <tr>
              <Th>Nombre</Th>
              <Th>Correo</Th>
              <Th>Fecha de creacion</Th>
              <Th>Acciones</Th>
            </tr>
          </THeadSticky>
          <tbody>
            {professors.map((professor) => (
              <Tr key={v4()}>
                <Td className='capitalize'>{professor.first_name} {professor.last_name}</Td>
                <Td>{professor.email}</Td>
                <Td>{dateFormatter(new Date(professor.created_at), 'es-MX')}</Td>
                <Td className='py-1'>
                  <div className='flex justify-center items-center'>
                    <Link
                      href={`/admin/professor/view/${professor?.owner ?? ''}`}
                      className='p-1 bg-itesus-primary rounded-md cursor-pointer hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
                    >
                      <IconEdit size={20} />
                    </Link>
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

    </Main>
  )
}
