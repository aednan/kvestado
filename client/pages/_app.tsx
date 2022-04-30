import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import GlobalContextWrapper from "../contexts/GlobalContextWrapper";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextWrapper>
      <Head>
        <title>Kvestado - Crowdfunding</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextWrapper>
  );
}

export default MyApp;
