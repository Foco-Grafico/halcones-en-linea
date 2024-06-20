import {
	H1,
	Main,
	autoColumns,
	ShyScrollbar,
	H2,
	H3,
} from "@/components/utils";
import { AddClassAsideContainer } from "./components/add-class-aside-container";
import { getAccount } from "@/services/supabase/actions/auth";
import { getClasses } from "@/services/supabase/actions/students";
import { v4 } from "@/utils/uuid";
import Link from "next/link";
import { IconEdit } from "@tabler/icons-react";

interface Props {
	params: {
		id: string;
	};
}

export default async function ViewStudentPage({ params }: Props) {
	const student = await getAccount(params.id);
	const studentClasses = await getClasses(params.id);

	return (
		<Main>
			<header className="flex justify-between mb-10">
				<Link
					href={`/admin/students/edit/${params.id}`}
					className="group flex items-center gap-4 text-white hover:text-blue-500 transition-colors"
				>
					<H1 className="capitalize">
						{student.first_name} {student.last_name}
					</H1>
					<IconEdit size={24} />
				</Link>

				<AddClassAsideContainer studentId={params.id} />
			</header>

			<section className="flex-1 flex flex-col overflow-hidden">
				<H2 className="text-white mb-4">Clases</H2>

				<div
					style={{
						...ShyScrollbar,
						gridTemplateColumns: autoColumns("500px", "1fr"),
					}}
					className="grid gap-2 flex-1 overflow-y-auto px-1"
				>
					{studentClasses.map((c) => (
						<article key={v4()} className="bg-white rounded-md p-4 h-min">
							<header className="flex justify-between">
								<div>
									<H3 className="leading-none text-black">{c.name}</H3>
									<span className="text-xs text-gray-500">
										{c.educationPlan?.name}
									</span>
								</div>

								<span className="text-xs text-gray-500">{c.group?.name}</span>
							</header>

							<section className="mt-4">
								<span className="text-gray-500 font-medium text-lg">
									Semestre {c.actualSemester.number}
								</span>

								<ul className="flex flex-col w-full">
									{c.actualSemester.subjects.map((s) => (
										<li key={v4()} className="capitalize">
											<span className="text-sm text-black">- {s.name}</span>
										</li>
									))}
								</ul>
							</section>

							<footer className="mt-4 flex justify-end">
								<button
									type="button"
									className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors mr-2"
								>
									Cambiar semestre
								</button>
								<button
									type="button"
									className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
								>
									Dar de baja
								</button>
							</footer>
						</article>
					))}
				</div>
			</section>
		</Main>
	);
}
