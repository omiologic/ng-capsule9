export interface MenuItem {
  id?: number;
  label?: string;
  title?: string;
  description?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  queryParams?: {
    [k: string]: any;
  };
  children?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
  routerLinkActiveOptions?: any;
  separator?: boolean;
  badge?: string;
  badgeStyleClass?: string;
  style?: any;
  styleClass?: string;
}
