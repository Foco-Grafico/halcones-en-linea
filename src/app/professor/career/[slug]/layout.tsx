import { DistroNavASide } from "@/app/layouts/distro-nav-aside";
import { getMyClasses } from "@/services/supabase/actions/professors";
import { constructSideBarOptions } from "@/components/sidebar/utils/add-side-bar-option";
import type { SideBarOption } from "@/components/sidebar/types";
import { getUser } from "@/services/supabase/actions/auth";
import { queryParamsSections, subjectRefs } from "./enums";
import { NavBarProf } from "@/components/navbar/variants/professor";

interface Props {
	params: {
		slug: string;
	};
	children: string;
}

export default async function Layout({ children, params }: Props) {
	const career = await getMyClasses(params.slug);
	const user = await getUser();

	const options = constructSideBarOptions(
		career.educationPlans.reduce((acc, plan) => {
			const elements = plan.groups.reduce((acc, group) => {
				const elements = group.semesters.reduce((acc, semester) => {
					const SideBarElement: SideBarOption = {
						title: `${semester.number}° SEMESTRE - GRUPO ${group.name} - ${plan.name.toUpperCase()}`,
						sub: semester.subjects.map((subject) => ({
							title: `${subject.name}`,
							href: `/professor/career/${params.slug}/${subject.slug ?? ""}`,
							queryParams: {
								groupId: group.id,
								semesterId: semester.id,
								educationPlanId: plan.id,
								subjectId: subject.id,
								careerId: career.id,
							},
							type: queryParamsSections.professorSubject,
							defaultRef: subjectRefs.schedule,
						})),
					};
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					return [...acc, SideBarElement];
				}, []);
				// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
				return [...acc, ...elements];
			}, []);

			// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
			return [...acc, ...elements];
		}, []),
	);
	return (
		<DistroNavASide navbar={<NavBarProf user={user} />} options={options}>
			{children}
		</DistroNavASide>
	);
}
