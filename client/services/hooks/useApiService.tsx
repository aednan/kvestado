import axios from "axios";
import useWeb3Service from "./useWeb3Service";
axios.defaults.withCredentials = true;

type Props = {};

export default function useApiService(props?: Props) {
  const { logout } = useWeb3Service();

  async function postRequest(url: string, body: any) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/${url}`,
        body
      );
      console.log(response);
    } catch (error: any) {
      if (error?.status === "401") logout();
      throw error;
    }
  }
  async function getRequest(url: string, params: any) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/${url}`,
        {
          params: { ...params },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) logout();
      throw error;
    }
  }

  return { getRequest, postRequest };
}
