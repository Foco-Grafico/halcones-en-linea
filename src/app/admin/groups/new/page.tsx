import {
	Form,
	FormSection,
	H1,
	LabeledInput,
	Main,
	LabeledSelect,
	SubmitButton,
	Option,
} from "@/components/utils";
import { getReducedCareers } from "@/services/supabase/actions/careers";
import { createGroup } from "@/services/supabase/actions/groups";
import { v4 } from "@/utils/uuid";

export default async function NewGroupPage() {
	const carears = await getReducedCareers();

	return (
		<Main>
			<H1 className="text-white">Crear Grupo</H1>
			<FormSection>
				<Form action={createGroup}>
					<LabeledInput
						label="Grupo"
						name="name"
						type="text"
						required
						placeholder="Grupo A, Grupo B, etc..."
					/>
					<LabeledSelect label="Carrera" name="career">
						{carears.map((career) => (
							<Option key={v4()} value={career.id}>
								{career.name}
							</Option>
						))}
					</LabeledSelect>
					<SubmitButton>Crear</SubmitButton>
				</Form>
			</FormSection>
		</Main>
	);
}
