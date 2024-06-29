"use server";
import { createClient } from "../actions";
import { USER_TYPES } from "../functions/types";
import {
  type IsClassOnlineProps,
  SubjectScheme,
  SubjectWithCreatedDate,
} from "./students.types";

export const isClassOnline = async ({
  carrerId,
  educationPlanId,
  groupId,
  semesterId,
}: IsClassOnlineProps) => {
  const supabase = await createClient();

  const twoHoursAgo = new Date();
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

  const { data } = await supabase
    .from("live-class")
    .select("subject")
    .eq("career", carrerId)
    .eq("plan", educationPlanId)
    .eq("group", groupId)
    .eq("semester", semesterId)
    .gte("created_at", twoHoursAgo.toISOString())
    .order("created_at", { ascending: false })
    .single();

  return data;
};

export const getStudents = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_data")
    .select("*")
    .eq("role", USER_TYPES.STUDENT);

  if (error != null) {
    console.error("Error getting students:", error);
    throw new Error("Error getting students");
  }

  return data;
};

export const getClasses = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_config")
    .select(
      "careers(id, name), education_plans(id, name), semesters(id, number, semester_subjects(subjects(id, name))), groups(id, name)",
    )
    .eq("owner", id);

  if (error != null) {
    console.error("Error getting student careers:", error);
    throw new Error("Error getting student careers");
  }

  const careers = data.map((c) => ({
    ...c.careers,
    educationPlan: c.education_plans,
    actualSemester: {
      id: c.semesters?.id,
      number: c.semesters?.number,
      semester_subjects: null,
      subjects: SubjectScheme.array().parse(
        c.semesters?.semester_subjects
          .map((ss) => ss.subjects)
          .filter((s) => s != null) ?? [],
      ),
    },
    group: c.groups,
  }));

  return careers;
};

export const getMyReducedCareers = async () => {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (userError != null || userData == null) {
    console.error("Error getting session:", userError);
    throw new Error("Error getting session");
  }

  const { data, error } = await supabase
    .from("student_config")
    .select(
      "careers(id, name, slug), education_plans(id, name), semesters(id, number), groups(id, name)",
    )
    .eq("owner", userData?.session?.user.id ?? "");

  if (error != null) {
    console.error("Error getting student careers:", error);
    throw new Error("Error getting student careers");
  }

  return data.map((c) => ({
    ...c.careers,
    educationPlan: c.education_plans,
    actualSemester: {
      id: c.semesters?.id,
      number: c.semesters?.number,
    },
    group: c.groups,
  }));
};

export const getMySubjects = async (careerSlug: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error != null || data.session == null) {
    console.error("Error getting session:", error);
    throw new Error("Error getting session");
  }

  const userId = data.session.user.id;

  const { data: studentData, error: studentError } = await supabase
    .from("student_config")
    .select(
      "semesters(id, number, semester_subjects(subjects(*))), careers(id, name, slug), groups(id, name), education_plans(id, name)",
    )
    .eq("owner", userId)
    .eq("careers.slug", careerSlug);

  const filteredStudentData = studentData?.filter((sc) => sc.careers);

  console.log("filteredStudentData:", filteredStudentData);

  if (studentError != null) {
    console.log("Error getting student subjects:", studentError);
    throw new Error("Error getting student subjects");
  }

  const subjects = SubjectWithCreatedDate.array().parse(
    (
      filteredStudentData?.map((s) =>
        s.semesters?.semester_subjects.map((ss) => ss.subjects),
      ) ?? []
    ).flat(),
  );

  return {
    group: filteredStudentData?.[0].groups,
    career: filteredStudentData?.[0].careers,
    educationPlan: filteredStudentData?.[0].education_plans,
    semester: filteredStudentData?.[0].semesters,
    subjects,
  };
};

interface Event {
  type: "broadcast";
  event: string;
  payload: {
    career: number;
    plan: number;
    group: number;
    semester: number;
    subject: number;
    subjectSlug: string;
  };
}

export const listenStartLiveClass = async () => {
  const supabase = await createClient();

  console.log("Listening to start live class");

  return await new Promise<Event>((resolve) => {
    supabase
      .channel("live-class")
      .on(
        "broadcast",
        {
          event: "start-class",
        },
        (e) => {
          resolve(e as Event);
        },
      )
      .subscribe();
  });
};

export const getClassesBySubject = async (subjectId: number) => {
  const supabase = await createClient();

  console.log(subjectId);

  const PATH = `${subjectId}/`;
  console.log(PATH);

  const { data, error } = await supabase.storage
    .from("classes")
    .list(PATH);

  if (error != null) {
    console.error("Error getting classes:", error);
    throw new Error("Error getting classes");
  }

  console.log(data);

  const filteredClasses = data.filter(f => !f.name.includes('emptyFolderPlaceholder'))


  const classes = await Promise.all(
    filteredClasses.map(async (f) => {
      const { data } = await supabase.storage.from("classes").getPublicUrl(`${subjectId}/${f.name}`)

      return {
        ...f,
        url: data.publicUrl
      }
    })
  )

  return classes;
};
