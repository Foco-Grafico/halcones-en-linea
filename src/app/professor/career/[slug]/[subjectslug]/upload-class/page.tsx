import { H1, Main } from "@/components/utils";
import { getClassesBySubject } from "@/services/supabase/actions/students";
import { v4 } from "@/utils/uuid";
import { UploadClassForm } from "./components/upload-class-form";

type Props = {
	searchParams: {
		subjectId: string;
	};
};

export default async function UploadClassPage({ searchParams }: Props) {
	const classes = await getClassesBySubject(
		Number.parseInt(searchParams.subjectId),
	);

	console.log(classes);

	return (
		<Main>
			<header>
				<H1>Subir clase grabada</H1>

				<p>
					Aqui puedes subir tu clase grabada para que otros profesores y alumnos
					puedan verla.
				</p>

				<UploadClassForm subjectId={Number(searchParams.subjectId)} />
			</header>

			<section>
				{classes.map((c) => (
					<article key={v4()}>
						<img src={c.url} alt="" />
						<p>{c.name}</p>
					</article>
				))}
			</section>
		</Main>
	);
}
