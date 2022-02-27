import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

export default function Layout() {
  return (
    <div className="flex h-full w-full flex-col bg-green-300 pt-20">
      <Header></Header>
      <Main></Main>
      {/* <Main></Main> */}
      <Footer></Footer>
    </div>
  );
}
