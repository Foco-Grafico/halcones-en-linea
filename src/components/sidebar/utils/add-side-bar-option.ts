import type { SideBarOption, SideBarOptions } from "../types";

export const addSideBarOption = (
  options: SideBarOptions,
  position: number,
  newOption: SideBarOption,
) => {
  if (position > 0 || position < options.length) {
    const newOptions = [...options];
    newOptions.splice(position, 0, newOption);
    return newOptions;
  }

  if (position === 0) {
    return [newOption, ...options];
  }

  if (position === options.length) {
    return [...options, newOption];
  }

  return options;
};

export const constructSideBarOptions = (options: SideBarOptions) => options;
