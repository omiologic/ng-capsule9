export interface AjaxList {
  error: any;
  list: any[] | null;
  listType: string | null;
  loading: boolean;
}

export interface AjaxListOptions {
  urls: any;
}
