export interface IPageProps {
  params: { locale: string; page: string; slug: string };
  searchParams?: { [key: string]: string | string[] };
}

export type TQueryParams = Record<string, string | number | boolean | undefined> | undefined;
