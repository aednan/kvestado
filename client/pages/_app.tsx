import { AppProps } from "next/app";
import Layout from "../components/Layout";
import GlobalContextWrapper from "../contexts/GlobalContextWrapper";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextWrapper>
  );
}

export default MyApp;
