import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

export default function Layout({ Component, pageProps }) {
  return (
    <div className="flex h-full min-h-screen flex-col bg-green-300 pt-20">
      <Header></Header>
      {/* <Main></Main> */}
      <Component {...pageProps} />
      <Footer></Footer>
    </div>
  );
}
