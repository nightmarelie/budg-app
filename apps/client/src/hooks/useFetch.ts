import useSWR from "swr";

const fetcher = <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => fetch(input, init).then((res) => res.json());

type FetchResponse<JSON, Error> = ReturnType<typeof useSWR<JSON, Error>>;

export const useFetch = <JSON = any>(
  url: string
): FetchResponse<JSON, Error> => {
  return useSWR<JSON, Error>(url, fetcher);
};
