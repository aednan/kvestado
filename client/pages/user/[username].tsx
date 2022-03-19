import React from "react";
import Profile from "../../components/Profile";
import Tabs from "../../components/Tabs";

type Props = {};

const UserProfile = (props: Props) => {
  return (
    <div className="relative mb-16 flex w-full flex-col  ">
      <Profile />
      <Tabs />
    </div>
  );
};

export default UserProfile;
