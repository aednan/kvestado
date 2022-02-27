import React, { Component } from "react";
import FundContract from "../contracts/Fund.json";
import { ethers } from "ethers";

import Navbar from "../components/navbar/Navbar";

// to get the contract address
const contractAddress = FundContract.networks["5777"].address;

class App extends Component {
  state = {
    storageValue: null,
    provider: null,
    accounts: null,
    rContract: null,
    wContract: null,
    signer: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Use web3 to get the user's accounts.
      const accounts = await provider.send("eth_requestAccounts", []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner();

      // Get the contract instance.

      // this is only to read from the contract and not transaction, by specifying a signer, a transaction is also allowed
      const rContract = new ethers.Contract(
        contractAddress,
        FundContract.abi,
        provider
      );

      // both read and write to the contract or by connecting a signer to the contract each time a transaction need to be done by using:   const contractx = contract.connect(signer);
      const wContract = new ethers.Contract(
        contractAddress,
        FundContract.abi,
        signer
      );

      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = FundContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   FundContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      //     // example of interacting with the contract's methods.
      this.setState(
        { provider, accounts, rContract, wContract, signer },
        this.runExample
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { signer, accounts, rContract, wContract } = this.state;

    // add campaign
    // await contract.methods.addCampaign('0x0e6cD375d7a15b4dad64FE765037Bc38ed335811',
    // "sdjkjsdsdkj", true, 50, 1644839321).send({ from: accounts[0] });

    // const contractx = contract.connect(signer);
    // ZZZ
    // const fundWithSigner = contract.connect(signer);

    // const tx =
    await wContract.addCampaign(
      "0x259c3bA0d310D37d1897561dB87aDe43CEe31Ed9",
      "sdjkjsdsdkj",
      true,
      50,
      1794924010
    );

    // await tx.wait();

    //  contract.getContribution("0x259c3bA0d310D37d1897561dB87aDe43CEe31Ed9",1)
    //   .then( result => {
    //       console.log( result);
    //     }).catch ( error => {
    //       console.log( error)
    //     });

    // Contribute function
    // await contract.methods.contribute('0x0e6cD375d7a15b4dad64FE765037Bc38ed335811',1)
    // .send({ from: accounts[0], value: (20 * 1000000000000000000)
    // });

    // return campaign struct
    // contract.methods.getCampaign('0x0e6cD375d7a15b4dad64FE765037Bc38ed335811',1).call()
    // .then( result => {
    //   console.log( result);
    // })

    // return contribution struct, with contributor address
    // contract.methods.getContribution(accounts[0],2).call()
    // .then( result => {
    //   console.log( result);
    // })

    // withdraw function only from the owner with the contract id
    // await contract.methods.withdraw(1).send({ from: accounts[0]});

    // suspend campaign
    // await contract.methods.suspendCampaign('0x0e6cD375d7a15b4dad64FE765037Bc38ed335811',2).send({ from: accounts[0]});

    // claim refund
    // await contract.methods.refundClaim('0x0e6cD375d7a15b4dad64FE765037Bc38ed335811',2).send({ from: accounts[0]});

    //---------------------------------------------------------
    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });

    // XX campaign get
    // const response = await contract.methods.getCampaign('0x0e6cD375d7a15b4dad64FE765037Bc38ed335811',1);
    // console.log(response);

    // X return contribution struct, in case of only campaign address
    // contract.methods.getContribution(accounts[0],2).call({ from: accounts[0]})
    // .then( result => {
    //   console.log( result);
    // })
  };

  render() {
    // if (!this.state.provider) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <>
        <Navbar className=" overflow-hidden " />
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
      // <h1 className="text-3xl font-bold underline"> web3 </h1>
    );
  }
}

export default App;
