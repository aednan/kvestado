import axios from "axios";
import { ValidationError } from "../ToolsService";
import useWeb3Service from "./useWeb3Service";
// axios.defaults.withCredentials = true;

type Props = {};

export default function useApiService(props?: Props) {
  const { logout } = useWeb3Service();

  async function postRequest(url: string, body: any) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/${url}`,
        body,
        {
          withCredentials: true,
        }
      );

      // console.log(response);
    } catch (error: any) {
      if (error?.response.status === "401") logout();
      throw error;
    }
  }
  async function getRequest(
    url: string,
    params: any,
    withCredentials: boolean,
    skip?: boolean
  ) {
    if (skip) throw new ValidationError();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/${url}`,
        {
          params: { ...params },
          withCredentials,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) logout();
      throw error;
    }
  }

  return { getRequest, postRequest };
}
