import type { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IMenuItemBase {
  el: ReactNode;
}
export interface ISubItem {
  title: string;
  el?: JSX.Element;
  subItem?: IMainMenuItem[];
}

export interface IMainMenuItem extends IMenuItemBase {
  subItem?: ISubItem;
}

export interface IMenuList {
  mainLinks: IMainMenuItem[];
  menuTitle?: string;
}

export interface IDropdownListProps {
  mainLinks: IMainMenuItem[];
  openSubMenuList: null | ISubItem;
  setOpenSubMenuList: Dispatch<SetStateAction<ISubItem | null>>;
  burger?: boolean;
  handleCancel?: () => void;
  hasChildren?: boolean;
  iconSize?: number;
  needCancel?: boolean;
}
