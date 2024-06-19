import { SideBarV2 } from "@/components/sidebar/sidebar";
import type { SideBarOptions } from "@/components/sidebar/types";

interface Props {
	children: React.ReactNode;
	navbar: React.JSX.Element;
	options: SideBarOptions;
}

export const DistroNavASide = ({ children, navbar, options }: Props) => {
	return (
		<div className="h-screen flex flex-col ">
			{navbar}
			<div className="flex flex-1 overflow-hidden">
				<SideBarV2 options={options} />
				<div className="flex-1 h-full bg-gradient-to-tr from-[#1f5186] to-[#131a2d] overflow-y-auto px-11 py-8">
					{children}
				</div>
			</div>
		</div>
	);
};
