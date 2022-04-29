import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Router, { useRouter } from "next/router";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import { ValidationError } from "../ToolsService";
declare var window: any;
const restrictedRoutes = "^/user/.*/|^/campaigns/create/$";
axios.defaults.withCredentials = true;

type Props = {};

export default function useWeb3Service(props?: Props) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/`,
    timeout: 1500,
    // headers: {'X-Custom-Header': 'kvestado'}
  });

  const route = useRouter();
  const fetcher = async (url: string, skip: boolean) => {
    if (skip) throw new ValidationError();
    try {
      const response = await instance.get(`${url}`, {
        withCredentials: true,
      });
      setUserInfo(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const {
    state,
    setAuthentication,
    setProvider,
    setWalletAddress,
    setDisableSubmitBtn,
    setUserInfo,
  } = useContext(AuthContext);

  //**** */

  // Errors will be caught at connectWallet level
  // challenge message is requested from the backend, and be sent back to the backend after being signed,
  // in exchange for a cookie or a jwt token after a successful authentication.
  async function userAuthentication(provider: any) {
    const signerAddress = await provider.getSigner().getAddress();
    let signedMessage: any = "";

    const challenge = await userRegistration(
      `request_challenge`,
      signerAddress
    );
    if (challenge !== "") {
      signedMessage = await window.ethereum?.request({
        method: "personal_sign",
        params: [challenge, signerAddress],
      });
      if (
        signerAddress === ethers.utils.verifyMessage(challenge, signedMessage)
      ) {
        // user authenticated
        // TODO: authentication should be done also in the backend
        // if user doesn't exist, account will be created with the wallet address
        // console.log(true);
        // console.log(challenge);
        // console.log(signedMessage);

        await userAuthenticationPostTemplate(
          "login",
          // `Basic ${btoa(signerAddress + ":" + signedMessage)}`
          { username: signerAddress, password: signedMessage }
        );
        return true;
      }
    }
    return false;
  }

  // Errors will be caught at connectWallet level
  async function userRegistration(url: string, walletAddress: string) {
    const response = await instance.get(url, {
      params: { wallet_address: walletAddress },
    });
    return response.data;
  }

  const redirectCallBack = () => {
    console.log("DD");

    if (!state.isAuthenticated) {
      route.replace("/");
    }
    // clearInterval(intervalId);
  };

  async function connectWallet() {
    // TODO: onConnect the user should sign the message received by the backend

    // Metamask is present, try connect wallet
    setDisableSubmitBtn(true);
    // let id = setTimeout(redirectCallBack, 10000);
    try {
      if (window.ethereum) {
        // const accounts: any = await withTimeoutWrapper(
        //   () =>
        //     window.ethereum.request({
        //       method: "eth_requestAccounts",
        //     }),
        //   10000,
        //   redirectCallBack
        // );

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setProvider(provider);
        }
        //

        // clearTimeout(id);
        // Delay

        if (
          !localStorage.getItem("Authenticated") &&
          (await userAuthentication(provider))
        ) {
          // setDisableSubmitBtn(true);
          // const auth = ;
          // if (auth === true) {
          setAuthentication(true);
          localStorage.setItem("Authenticated", "true");
          // To reconnect user after page refresh if already authenticated
        } else if (localStorage.getItem("Authenticated")) {
          setAuthentication(true);
        }
      } else {
        // TODO show alert
        console.log("Metamask isn't installed");
        // route.push("/campaigns/");
        // route.replace("/");
      }
    } catch (error: any) {
      // if the route require authentication && user decline connection
      // redirect to home page

      if (
        (await Router.asPath.match(restrictedRoutes)) &&
        error?.code !== -32002
      ) {
        route.push("/");
      }
      console.log(error);
    }
    setDisableSubmitBtn(false);
  }

  async function checkIfConnected() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts > 0 && localStorage.getItem("Authenticated")) {
        connectWallet();
        return true;
      }
      if (localStorage.getItem("Authenticated")) {
        await logout();
      }
    }
    return false;
  }

  async function logout() {
    try {
      // clear cookies or jwt token
      // Authentication will be done using the cookie
      await userAuthenticationPostTemplate("logout");
      // await logoutAPI();
    } catch (error) {
      console.log(error);
    }
    // reset swr cache
    // userMutation({});
    // mutate(`${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/user/userinfo`);

    // reset state
    setAuthentication(false);
    setProvider({});
    setWalletAddress("");
    setDisableSubmitBtn(false);
    setUserInfo({});

    // redirect user to home page only when route required authentication
    // route from hook doesn't retrieve the correct path.
    // ex: Access the Frontend for the first time, authenticate the user,
    // navigate to the user settings via the option in the navigation bar,
    // switch to another wallet account in Metamask.
    // The initial route value is retained
    //****** */
    // asPath: include current route & query
    // pathname: include only current route

    if (await Router.asPath.match(restrictedRoutes)) {
      route.replace("/");
    }

    // clear local storage authentication
    localStorage.clear();
  }

  // async function login(
  //   url: string,
  //   walletAddress: string,
  //   signedMessage: string
  // ) {
  //   const response = await axios.post(url, null, {
  //     headers: {
  //       Authorization: `Basic ${btoa(walletAddress + ":" + signedMessage)}`,
  //     },
  //     withCredentials: true,
  //   });
  //   return response.data;
  // }

  // async function backendLogout(url: string) {
  //   await axios.post(url, null, {
  //     headers: {
  //       Authorization: `Basic `,
  //     },
  //   });
  // }

  async function userAuthenticationPostTemplate(
    url: string,
    authorization?: { username: string; password: string } | undefined
  ) {
    const response = await instance.post(`${url}`, null, {
      // headers: {
      //   Authorization: authorization,
      // },
      auth: authorization,
      withCredentials: true,
    });
    return response.data;
  }
  // async function logoutAPI() {
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_KVESTADO_API_URL}/logout`,
  //     null,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //   return response.data;
  // }

  //**** */

  useEffect(() => {
    checkIfConnected();

    const updateUser = () => {
      instance
        .get(`${"user/userinfo"}`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Metamask events, accounts
    async function onWalletAddressChange(accounts: any) {
      //TODO: to unsubscribe
      // ethereum.removeListener('accountsChanged', logAccounts);
      if (localStorage.getItem("Authenticated")) {
        await logout();
      }
      // window.ethereum.on("accountsChanged", function);
    }
    // networkId
    async function onNetworkChange(a: Function) {
      // window.ethereum.on("networkChanged", a);
      //
    }

    // Metamask accountsChanged event
    window.ethereum?.on("accountsChanged", onWalletAddressChange);
    // window.ethereum.on("networkChanged", onNetworkChange);

    // check user session if logged in
    // if (state.isAuthenticated) {
    //   userAuthenticationPostTemplate("login")
    //     .then((res) => {
    //       if (
    //         Object.keys(state.userInfo).length == 0 ||
    //         state.userInfo.username === ""
    //       )
    //         updateUser();
    //     })
    //     .catch((err) => {
    //       console.log("Session not valid");
    //       logout();
    //     });
    // }

    return () => {
      window.ethereum?.removeListener("accountsChanged", onWalletAddressChange);
      // window.ethereum.removeListener("networkChanged", onNetworkChange);
    };
  }, [state.isAuthenticated]);

  return {
    userRegistration,
    restrictedRoutes,
    fetcher,
    logout,
    // checkIfConnected,
    connectWallet,
    userAuthentication,
  };
}
