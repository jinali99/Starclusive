import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdLiveTv } from "react-icons/md";
import { TbClubs } from "react-icons/tb";
import { MdConnectWithoutContact } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { FiYoutube } from "react-icons/fi";
import "./SideMenu.css";



const iconSize = 30;

const menuItems = [
  { title: "New Feed", icon: <AiOutlineHome size={iconSize} /> },
  { icon: <MdLiveTv size={iconSize} />, title: "Live Streams" },
  { icon: <FiYoutube size={iconSize} />, title: "Video" },
  { icon: <TbClubs size={iconSize} />, title: "Clubs" },
  { icon: <MdConnectWithoutContact size={iconSize} />, title: "Connectios" },
  { icon: <BiShoppingBag size={iconSize} />, title: "e-shop" },
];

// --------------------

const SideMenu = () => {
  const [activeTab, setActiveTab] = useState(menuItems[0].title);

  const activeTabHandler = (tabTitle) => {
    console.log('tabtiel', tabTitle)
    setActiveTab(tabTitle);
  };

  return (
    <div className="root-sideMenu">
      <div className="sideMenu-logo">
        <img src="/image/post.png" alt="" />
      </div>

      <div className="menuList">
        {menuItems.map((menuItem) => {
          return (
            <div
              key={menuItem}
              className={`${activeTab === menuItem.title ? "active-item" : ""
                } menuItem`}
              onClick={() => activeTabHandler(menuItem.title)}
            >
              <span>{menuItem.icon}</span>
              <label> {menuItem.title}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
