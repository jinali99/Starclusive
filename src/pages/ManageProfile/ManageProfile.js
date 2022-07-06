import React, { useState } from "react";
import "./MangeProfile.css";
import { MdLiveTv } from "react-icons/md";
import { BiUserCircle } from 'react-icons/bi';
import Info from "./Info/Info";

import ManageCards from "./ManageCards";
import Header from "../../components/Header/Header";
import SideMenu from '../../components/SideMenu/SideMenu'

import "react-datepicker/dist/react-datepicker.css";

const iconSize = "1.5rem";

const mainOptions = [
  {
    title: "My information",
    url: "my-information",
    icon: <BiUserCircle size={iconSize} />,
  },
  {
    title: "Manage Cards",
    icon: <MdLiveTv size={iconSize} />,
    url: "manage-cards",
  },
  {
    title: "Bank Account",
    icon: <MdLiveTv size={iconSize} />,
    url: "bank-account",
  },
  {
    title: "Account Settings",
    icon: <MdLiveTv size={iconSize} />,
    url: "account-settings",
  },
  {
    title: "Subscription",
    icon: <MdLiveTv size={iconSize} />,
    url: "subscription",
  },
];

const ManageProfile = () => {
  const [activeTab, setActiveTab] = useState(mainOptions[0].url);

  const activeTabHandler = (tabURL) => {
    setActiveTab(tabURL);
  };

  return (
    <>
      <SideMenu />
      <div className="screen">

      <Header />
      <div className="main-content">
      <div className="root-manage-profile">
        <div className="main-options-btns-container">
          {mainOptions.map((option) => (
            <div
              key={option.title}
              className={`${
                activeTab === option.url ? "active-option-btn" : ""
              } option-btn`}
              onClick={() => activeTabHandler(option.url)}
            >
              <MdLiveTv size={iconSize} />
              {option.title}
            </div>
          ))}
        </div>
        {activeTab === "my-information" && <Info />}
        {activeTab === "manage-cards" && <ManageCards />}
      
      </div>
      </div>

      </div>
      
    </>
  );
};

export default ManageProfile;
