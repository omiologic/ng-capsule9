export interface SidebarItem {
  label: SidebarItemLabel,
  list?: Array<SidebarItem>
}

export interface SidebarItemLabel {
  text: string,
  link?: string
}
