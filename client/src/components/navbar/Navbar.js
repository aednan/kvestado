// import Image from 'next/image'
// import Link from 'next/link'
import React, { useState } from "react";
// import openseaLogo from '../assets/opensea.png'
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet, MdMenu, MdClose } from "react-icons/md";
import "./Navbar.css";
import MobileNav from "./MobileNav";

// const style = {
//   wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
//   logoContainer: `flex items-center cursor-pointer`,
//   logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
//   searchBar: `flex flex-1 mx-[8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
//   searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
//   searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
//   headerItems: ` flex items-center justify-end`,
//   headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
//   headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
// };

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="wrapper absolute">
        <div className="logoContainer">
          <div className="logoText">KVESTAGO</div>
        </div>

        {/* <Link href="/">
        <div className={style.logoContainer}>
          <Image 
        //   src={openseaLogo}
           height={40} width={40} />
          <div className={style.logoText}>Opensea</div>
        </div>
      </Link> */}
        {/* <div className="searchBar w-max-[520px] ">
          <div className="searchIcon">
            <AiOutlineSearch />
          </div>
          <input
            className="searchInput"
            placeholder="Search items, collections, and accounts"
          />
        </div> */}
        <div>
          <div className="headerItems">
            {/* <Link href="/collections/0x66a576A977b7Bccf510630E0aA5e450EC11361Fa">
          <div className={style.headerItem}> Collections </div>
        </Link> */}
            <div className="headerItem"> Explore </div>
            <div className="headerItem"> Create </div>
            {/* <div className={style.headerItem}> Create </div> */}
            <div className="headerIcon">
              <CgProfile />
            </div>
            <div className="headerIcon ">
              <MdOutlineAccountBalanceWallet />
            </div>

            <div className="headerIcon lg:hidden ">
              {!open && <MdMenu onClick={() => setOpen(!open)} />}
              {open && <MdClose onClick={() => setOpen(!open)} />}
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </>
  );
};

export default Navbar;
