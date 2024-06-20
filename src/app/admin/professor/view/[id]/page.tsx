import {
	H1,
	H2,
	H3,
	H4,
	Main,
	ShyScrollbar,
	THeadSticky,
	Table,
	TableContainer,
	Td,
	Th,
	Tr,
	autoColumns,
} from "@/components/utils";
import { AddClassAsideContainer } from "./components/add-class";
import { v4 } from "@/utils/uuid";
import { getAccount } from "@/services/supabase/actions/auth";
import { getProfessorConfigData } from "@/services/supabase/actions/admin/professor";
import Link from "next/link";
import { IconEdit } from "@tabler/icons-react";

interface Props {
	params: {
		id: string;
	};
}

export default async function ProfessorViewPage({ params }: Props) {
	const professor = await getAccount(params.id);

	const careers = await getProfessorConfigData(params.id);

	return (
		<Main>
			<header className="flex justify-between mb-10">
				<Link
					href={`/admin/professor/edit/${params.id}`}
					className="group flex items-center gap-4 text-white hover:text-blue-500 transition-colors"
				>
					<H1 className="capitalize">
						{professor.first_name} {professor.last_name}
					</H1>
					<IconEdit size={24} />
				</Link>
				<AddClassAsideContainer professorId={params.id} />
			</header>

			<section className="flex-1 flex flex-col overflow-hidden">
				<H2 className="text-white mb-4">Carreras</H2>

				<div
					style={{
						...ShyScrollbar,
						gridTemplateColumns: autoColumns("500px", "1fr"),
					}}
					className="grid gap-2 flex-1 overflow-y-auto px-1"
				>
					{careers.map((c) => (
						<article key={v4()} className="bg-white rounded-md p-4">
							<H3 className="capitalize text-black">{c.name}</H3>

							<ul className="flex flex-col w-full gap-3">
								{c.educationPlans.map((p) => (
									<li key={v4()} className="capitalize">
										<H4 className="text-gray-700">{p.name}</H4>

										{p.groups.map((g) => (
											<TableContainer key={v4()}>
												<Table>
													<THeadSticky>
														<tr>
															<Th className="text-black text-center">
																{g.name}
															</Th>
															{g.semesters.map((s) => (
																<Th
																	className="text-black text-center"
																	key={v4()}
																>
																	Semestre {s.number}
																</Th>
															))}
														</tr>
													</THeadSticky>

													<tbody>
														{Array.from({
															length: g.semesters.reduce((acc, curr) => {
																if (curr.subjects.length > acc) {
																	return curr.subjects.length;
																}

																return acc;
															}, 0),
														}).map((_, i) => {
															return (
																<Tr key={v4()}>
																	<td />
																	{g.semesters.map((s) => (
																		<Td
																			className="text-black text-center"
																			key={v4()}
																		>
																			{s.subjects[i]?.name}
																		</Td>
																	))}
																</Tr>
															);
														})}
													</tbody>
												</Table>
											</TableContainer>
										))}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>
		</Main>
	);
}
