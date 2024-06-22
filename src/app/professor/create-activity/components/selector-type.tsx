"use client";

import type { Enums } from "database.types";

interface Props {
	onSelect?: (type: Enums<"activity_type">) => void;
}

export const SelectorType = ({ onSelect }: Props) => {
	return (
		<div className="flex flex-col w-full gap-2 h-full justify-center items-center">
			<Button
				onClick={() => {
					onSelect?.("trivia");
				}}
			>
				Trivia
			</Button>
			<Button
				onClick={() => {
					onSelect?.("exam");
				}}
			>
				Examen
			</Button>
			<Button
				onClick={() => {
					onSelect?.("questionary");
				}}
			>
				Cuestionario
			</Button>
			<Button
				onClick={() => {
					onSelect?.("work");
				}}
			>
				Trabajo
			</Button>
		</div>
	);
};

const Button = ({
	children,
	...props
}: React.HTMLAttributes<HTMLButtonElement>) => (
	<button
		type="button"
		className="bg-[#aaaaa9] w-full rounded-md text-left px-5 font-bold text-lg"
		{...props}
	>
		{children}
	</button>
);
