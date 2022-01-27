import useSWR from "swr";

import { OgpData } from "../types";

export function useOgp(url: string) {
  const fetcher = (path: string) => fetch(path).then((res) => res.json());
  const { data, error } = useSWR<OgpData>(`/api/getOgp?url=${url}`, fetcher);

  return { data, error };
}
