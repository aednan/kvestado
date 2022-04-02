import useSWR from "swr";
import useWeb3Service from "./useWeb3Service";

type Props = {};

export default function useUser(props?: Props) {
  const { fetcher, logout } = useWeb3Service();
  const { data, mutate, error } = useSWR(
    `userinfo`,
    fetcher,
    { refreshInterval: 1800000, revalidateOnReconnect: true } // 30 minutes, refreshInterval in milliseconds
  );
  if (error && localStorage.getItem("Authenticated")) {
    logout();
  }

  const loading = !data && !error;
  console.log(data);
  return { data, mutate, error, loading };
}
