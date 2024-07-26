import { H1, Main } from "@/components/utils";
import { getClassesBySubject } from "@/services/supabase/actions/students";
import { v4 } from "@/utils/uuid";
import { UploadClassForm } from "./components/upload-class-form";
import Link from "next/link";

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
			<header className="flex flex-col mb-4">
				<H1>Subir clase grabada</H1>

				<p>
					Aqui puedes subir tu clase grabada para que otros profesores y alumnos
					puedan verla.
				</p>

				<UploadClassForm subjectId={Number(searchParams.subjectId)} />
			</header>

			<section
				className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#cdcbcc]"
			>
				{classes.map((c) => (
					<Link
						key={v4()}
						href={c.url}
						className="rounded-xl bg-[#cdcbcc]"
					>
						<p
							className="flex flex-row gap-2 items-center text-black"
						>{c.name}</p>
					</Link>
				))}
			</section>
		</Main>
	);
}
