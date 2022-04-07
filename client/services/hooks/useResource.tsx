import useSWR from "swr";
import useApiService from "./useApiService";

type Props = {
  resourcePath: String;
  params?: any;
  skip: boolean;
};

export default function useResource(props: Props) {
  const { getRequest } = useApiService();
  const { data, mutate, isValidating, error } = useSWR(
    props.resourcePath,
    (url: string) => getRequest(url, props.params, false, props.skip),
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );

  if (error && error.message !== "Skip Request") {
    console.log(error);
  }
  const loading = !data && !error;

  return { data, mutate, isValidating, error, loading };
}
