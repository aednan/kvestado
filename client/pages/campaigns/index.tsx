import React, { useEffect } from "react";
import Campaigns from "../../components/Campaigns";
import useApiService from "../../services/hooks/useApiService";
// import Hero from "../../components/Hero";

type Props = {};

export default function campaigns({}: Props) {
  const { getRequest } = useApiService();

  useEffect(() => {}, []);

  return (
    <>
      <div className="   bg-red-300">
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
        <h1 className="text-3xl font-bold underline"> web3 </h1>
      </div>
    </>
  );
}
