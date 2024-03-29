import { QueryData } from '@supabase/supabase-js'
import { supabase } from './client'

const educationPlan = supabase.from('education_plans').select('*, semesters(*, semester_subjects(subjects(*)))').single()

export type EducationPlan = QueryData<typeof educationPlan>

const reducedCareer = supabase.from('careers').select('id, name, campus(id, name)').single()

export type ReducedCareer = QueryData<typeof reducedCareer>

const groupByCareer = supabase.from('groups').select('id, name, created_at').single()

export type GroupByCareer = QueryData<typeof groupByCareer>

const educationPlanByCareer = supabase.from('education_plans').select('id, name, created_at, semesters(id, number)').single()

export type EducationPlanByCareer = QueryData<typeof educationPlanByCareer>

export const accountQuery = supabase.from('user_data').select('*').single()

export type Account = QueryData<typeof accountQuery>

export const userWithRoles = supabase.from('user_data').select('*, roles(*)').single()

export type UserWithRoles = QueryData<typeof userWithRoles>
