import React from "react";
import Campaigns from "../../components/Campaigns";
import Hero from "../../components/Hero";

type Props = {};

export default function campaign({}: Props) {
  return (
    <>
      <Hero />
      <Campaigns />
    </>
  );
}
