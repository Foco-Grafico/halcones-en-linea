"use client";

import { deleteActivity } from "@/services/supabase/actions/activities";
import { IconTrash } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

type Props = {
	activityId: number;
};

export const RemoveActivityButton = ({ activityId }: Props) => {
	const pathname = usePathname();

	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				deleteActivity(activityId, pathname);
			}}
			type="button"
			className="bg-[#c23333] text-white font-bold px-3 py-1 rounded-md"
		>
			<IconTrash />
		</button>
	);
};
