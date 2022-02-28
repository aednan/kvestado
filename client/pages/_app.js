import CommandPalette from "../components/CommandPalette";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-full min-h-screen ">
      <CommandPalette />
      <Navbar />
      <Layout Component={Component} pageProps={pageProps}></Layout>
    </div>
  );
}

export default MyApp;
