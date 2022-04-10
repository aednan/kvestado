import axios from "axios";
import { ValidationError } from "../ToolsService";
import useWeb3Service from "./useWeb3Service";
// axios.defaults.withCredentials = true;

type Props = {};

export default function useApiService(props?: Props) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/`,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'kvestado'}
  });

  const { logout } = useWeb3Service();

  async function postRequest(url: string, body: any) {
    try {
      const response = await instance.post(`${url}`, body, {
        withCredentials: true,
      });

      // console.log(response);
    } catch (error: any) {
      if (error?.response?.status === "401") logout();
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
      const response = await instance.get(`${url}`, {
        params: { ...params },
        withCredentials,
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 401) logout();
      throw error;
    }
  }

  return { getRequest, postRequest, instance };
}
