'use client'

import { AddClassForm } from '@/app/admin/components/add-class-form'
import { AsideFadeIn } from '@/components/aside-fade-in'
import { PlusButton } from '@/components/utils'
import { assignClass } from '@/services/supabase/actions/admin/student'

interface Props {
  studentId: string
}

export const AddClassAsideContainer = ({ studentId }: Props) => {
  return (
    <AsideFadeIn
      Button={(props) => (
        <PlusButton {...props} />
      )}
      Render={(props) => (
        <AddClassForm
          action={assignClass}
          metadata={{
            student: studentId
          }}
          withoutSubjects
          {...props}
        />
      )}
    />
  )
}
