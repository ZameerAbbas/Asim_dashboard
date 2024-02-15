import React, { useState } from "react";
import { FaTh, FaMale } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/",
      name: "Login",
      icon: <FaMale size={30} />,
    },
    {
      path: "/Dashboard",
      name: "Gems",
      icon: <FaTh size={30} />,
    },
    {
      path: "/Minerals",
      name: "Minerals",
      icon: <FaTh size={30} />,
    },
    {
      path: "/SpecialOffer",
      name: "SpecialOffer",
      icon: <FaTh size={30} />,
    },
    {
      path: "/Trendingproduct",
      name: "Trendingproduct",
      icon: <FaTh size={30} />,
    },
    {
      path: "/FavoriteCategories",
      name: "FavoriteCategories",
      icon: <FaTh size={30} />,
    },
  ];
  return (
    <div className="Sidecontainer">
      <div className="sidebar">
        <div className="sider-inner">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div>{item.name}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
