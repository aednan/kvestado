import { useContext } from "react";
import useSWR from "swr";
import AuthContext from "../../contexts/AuthContext";
import useWeb3Service from "./useWeb3Service";

type Props = {
  skip: boolean;
};

export default function useUser(props: Props) {
  const { state, setUserInfo } = useContext(AuthContext);

  const { fetcher, logout } = useWeb3Service();
  const { data, mutate, isValidating, error } = useSWR(
    `user/userinfo`,
    (url: string) => fetcher(url, props.skip),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      // refreshInterval: 1800000, revalidateOnReconnect: true } // 30 minutes, refreshInterval in milliseconds
    }
  );

  if (
    error &&
    error?.message !== "Skip Request" &&
    localStorage.getItem("Authenticated")
  ) {
    console.log(error);
    logout();
  }

  // this is done on the fetcher
  // useEffect(() => {
  //   console.log(data);
  //   if (data) {
  //     setUserInfo(data);
  //   }
  // }, [data]);

  const loading = !data && data !== undefined && !error;
  return { data, mutate, isValidating, error, loading };
}
