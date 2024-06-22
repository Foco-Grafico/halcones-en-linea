"use client";

import { IconPlayerPlay } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
	activityId: number;
}

export const ActivityLink = ({ activityId }: Props) => {
	const pathname = usePathname();
	const seachParams = useSearchParams();

	return (
		<Link
			href={`${pathname}/do/${activityId}?${seachParams.toString()}`}
			className="bg-[#bdc141] px-3 py-1 flex items-center justify-center rounded-r-lg"
		>
			<IconPlayerPlay size={24} />
		</Link>
	);
};
