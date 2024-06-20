"use client";

import {
	Form,
	H1,
	LabeledSelect,
	Option,
	SubmitButton,
} from "@/components/utils";
import { v4 } from "@/utils/uuid";
import { useAddSubjects } from "../professor/view/[id]/hooks/use-add-subjects";

interface Props {
	close: () => void;
	action?: (data: FormData) => Promise<void>;
	withoutSubjects?: boolean;
	metadata?: {
		[key: string]: string | number;
	};
}

export const AddClassForm = ({
	close,
	action,
	withoutSubjects = false,
	metadata,
}: Props) => {
	const {
		careers,
		selectedCareer,
		changeCareer,
		changeEducationPlan,
		changeSemester,
		educationPlans,
		groups,
		selectedEducationPlan,
		semester,
		subjects,
		selectedGroup,
		selectedSubject,
		setSelectedGroup,
		setSelectedSubject,
	} = useAddSubjects({ withoutSubjects });

	return (
		<Form action={action}>
			{Object.entries(metadata ?? {}).map(([key, value]) => (
				<input key={v4()} name={key} type="hidden" value={String(value)} />
			))}

			<H1 className="text-white mb-4">Agregar clase</H1>

			<LabeledSelect
				required
				name="career"
				label="Carrera"
				value={selectedCareer?.id}
				onChange={(e) => {
					changeCareer(Number(e.target.value)).catch(console.error);
				}}
			>
				{careers.map((career) => (
					<Option key={v4()} value={career.id}>
						{career.name}
					</Option>
				))}
			</LabeledSelect>

			<LabeledSelect
				required
				name="educationPlan"
				label="Plan de estudios"
				value={selectedEducationPlan?.id}
				onChange={(e) => {
					changeEducationPlan(Number(e.target.value)).catch(console.error);
				}}
			>
				{educationPlans.map((plan) => (
					<Option key={v4()} value={plan.id}>
						{plan.name}
					</Option>
				))}
			</LabeledSelect>

			<LabeledSelect
				required
				label="Grupo"
				name="group"
				value={selectedGroup ?? undefined}
				onChange={(e) => setSelectedGroup(Number(e.target.value))}
			>
				{groups.map((group) => (
					<option key={v4()} value={group.id}>
						{group.name}
					</option>
				))}
			</LabeledSelect>

			<LabeledSelect
				required
				label="Semestre"
				name="semester"
				value={semester?.id}
				onChange={(e) => {
					changeSemester(Number(e.target.value)).catch(console.error);
				}}
			>
				{selectedEducationPlan?.semesters.map((semester) => (
					<Option key={v4()} value={semester.id}>
						{semester.number}
					</Option>
				))}
			</LabeledSelect>

			{!withoutSubjects && (
				<LabeledSelect
					required
					label="Materia"
					name="subject"
					value={selectedSubject ?? undefined}
					onChange={(e) => setSelectedSubject(Number(e.target.value))}
				>
					{subjects.map((subject) => (
						<Option key={v4()} value={subject.id}>
							{subject.name}
						</Option>
					))}
				</LabeledSelect>
			)}

			<SubmitButton onClick={close}>Agregar</SubmitButton>
		</Form>
	);
};
