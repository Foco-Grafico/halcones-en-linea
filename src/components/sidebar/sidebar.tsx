import { SideBarMultiItem } from "./sidebar-item";
import { v4 } from "@/utils/uuid";
import type { SideBarOptions } from "./types";
import { ShyScrollbar } from "../utils";

interface Props {
	options: SideBarOptions;
}

export const SideBarV2 = ({ options }: Props) => {
	return (
		<aside
			style={ShyScrollbar}
			className="bg-[#cdcccb] h-full w-80 overflow-y-auto"
		>
			<ul className="flex flex-col gap-1">
				{options.map((o) => (
					<SideBarMultiItem subItems={o.sub} key={v4()}>
						{o.title}
					</SideBarMultiItem>
				))}
			</ul>
		</aside>
	);
};
