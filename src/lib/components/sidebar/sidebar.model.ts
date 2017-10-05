export interface SidebarItem {
  label: SidebarItemLabel,
  list?: Array<SidebarItem>
}

export interface SidebarItemLabel {
  text: string,
  link?: string
}

export interface SidebarConfig {
  fixedTopLevel?: boolean;
  minified?: boolean;
  theme?: 'default' | 'dark' | 'iconize';
}
