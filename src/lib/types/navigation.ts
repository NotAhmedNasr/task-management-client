export type NavItemBase = {
  text: string;
  icon?: React.ReactNode
};

export type NavLinkData = NavItemBase & {
  href: string;
};

export type NavButtonData = NavItemBase & {
  onClick: () => void;
};

export type NavItemData = NavLinkData | NavButtonData;

export const isNavLink = (link: NavItemData): link is NavLinkData => {
  return !!(link as NavLinkData).href;
};

export const isNavButton = (link: NavItemData): link is NavButtonData => {
  return !!(link as NavButtonData).onClick;
};
