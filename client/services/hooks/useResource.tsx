import useSWR from "swr";
import useApiService from "./useApiService";

type Props = {
  resourcePath: String;
  params?: any;
  skip: boolean;
  withCredentials: boolean;
  fallbackData?: any;
};

export default function useResource(props: Props) {
  const { getRequest } = useApiService();
  const { data, mutate, isValidating, error } = useSWR(
    props.resourcePath,
    (url: string) =>
      getRequest(url, props.params, props.withCredentials, props.skip),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      fallbackData: props.fallbackData,
    }
  );

  if (error && error.message !== "Skip Request") {
    console.log(error);
  }
  const loading = !data && data !== undefined && !error;

  return { data, mutate, isValidating, error, loading };
}
