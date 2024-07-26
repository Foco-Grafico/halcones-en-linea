"use client";

import { uploadClass } from "@/services/supabase/actions/professors";
import { usePathname, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

type Props = {
	subjectId: number;
};

export const UploadClassForm = ({ subjectId }: Props) => {
	const $inputFile = useRef<HTMLInputElement>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<form
			className="flex gap-4 items-center"
			onSubmit={(e) => {
				e.preventDefault();

				const file = $inputFile.current?.files?.[0];

				if (file == null) return;

				const filename = file?.name ?? "";

				file?.arrayBuffer().then(async (arrayBuffer) => {
					const base64 = Buffer.from(arrayBuffer).toString("base64");

					const promiese = uploadClass(
						subjectId,
						{
							bytes: base64,
							name: filename,
						},
						`${pathname}?${searchParams.toString()}`,
					);

					toast.promise(promiese, {
						loading: "Subiendo clase...",
						success: "Clase subida",
						error: "Error al subir clase",
					});
				});

				e.currentTarget.reset();
			}}
		>
			<input ref={$inputFile} type="file" />
			<button className="
				rounded-md
				bg-itesus-primary
				px-3
			" type="submit">Subir</button>
		</form>
	);
};
