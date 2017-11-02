export interface AjaxList {
  error: any;
  list: any[];
  listType: string;
  loading: boolean;
}

export interface AjaxListOptions {
  urls: string[];
}
