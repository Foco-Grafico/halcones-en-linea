"use client";

import { Form, LabeledInput, SubmitButton } from "@/components/utils";
import { updateAccountInfo } from "@/services/supabase/actions/admin/auth";
import { register } from "@/services/supabase/client";
import type { USER_TYPES } from "@/services/supabase/functions/types";
import type { Account } from "@/services/supabase/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
	role: USER_TYPES;
	redirect?: string;
	defaultValues?: Account;
	from: "students" | "professor" | "coordinators";
}

export const RegisterForm = ({
	role,
	redirect,
	defaultValues,
	from,
}: Props) => {
	const { push } = useRouter();
	const [message, setMessage] = useState<{
		message: string;
		type: "success" | "error";
	} | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage(null);

		const execute =
			defaultValues != null
				? () => {
						const data = new FormData(e.currentTarget);

						updateAccountInfo(data, from).catch((err) => {
							console.error(err);

							setMessage({
								message: "Error al actualizar usuario",
								type: "error",
							});
						});
					}
				: () => {
						register({
							birthdate: new Date(e.currentTarget.birthdate.value),
							email: e.currentTarget.email.value,
							firstName: e.currentTarget.first_name.value,
							lastName: e.currentTarget.last_name.value,
							password: e.currentTarget.password.value,
							phone: e.currentTarget.phone.value,
							role,
						})
							.then(() => {
								setMessage({
									message: "Usuario registrado",
									type: "success",
								});

								if (redirect != null) {
									push(redirect);
								}
							})
							.catch((err) => {
								console.error(err);

								setMessage({
									message: "Error al registrar usuario",
									type: "error",
								});
							});
					};

		execute();

		e.currentTarget.reset();
	};

	return (
		<Form className="flex flex-col h-full gap-2 p-3 ." onSubmit={handleSubmit}>
			{defaultValues != null && (
				<input type="hidden" name="owner" value={defaultValues.owner ?? ""} />
			)}

			<LabeledInput
				label="Nombres"
				name="first_name"
				placeholder="Escribe el nombre de tu usuario"
				defaultValue={defaultValues?.first_name ?? ""}
			/>

			<LabeledInput
				label="Apellidos"
				name="last_name"
				placeholder="Escribe el apellido de tu usuario"
				defaultValue={defaultValues?.last_name ?? ""}
			/>

			<LabeledInput
				label="Correo"
				name="email"
				type="email"
				placeholder="example@example.com"
				defaultValue={defaultValues?.email ?? ""}
			/>

			{defaultValues == null && (
				<LabeledInput
					label="Contraseña"
					name="password"
					type="password"
					placeholder="********"
				/>
			)}

			<LabeledInput
				label="Telefono"
				name="phone"
				type="tel"
				placeholder="1234567890"
				defaultValue={defaultValues?.phone ?? ""}
			/>

			{defaultValues == null && (
				<LabeledInput
					label="Fecha de nacimiento"
					name="birthdate"
					type="date"
				/>
			)}

			<SubmitButton className="bg-white text-[#1a63a5] hover:bg-[#cdcccb] focus:ring-white rounded py-2">
				{defaultValues == null ? "Registrar" : "Actualizar"}
			</SubmitButton>

			{message != null && (
				<div
					className={`text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded-md bg-opacity-50 text-center mt-4 animate-fade-in animate-duration-150`}
				>
					{message.message}
				</div>
			)}
		</Form>
	);
};
