export enum NavChildType {
  Body = "body",
  Content = "content",
}

export type NavHeader = {
  title: string;
  image:string;
  slug: string;
  NavChildren?: NavChild[];
};
export type NavChild = {
  title: string;
  type: NavChildType ;
  NavChildren?: NavChild[];
  description?: string;
  price?: number;
};
