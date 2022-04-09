import React from "react";
import Hero from "../components/Hero";
import Campaigns from "../components/Campaigns";

type Props = {};

function Home({}: Props) {
  return (
    <>
      <Hero />
      <Campaigns />
    </>
  );
}

export default Home;
