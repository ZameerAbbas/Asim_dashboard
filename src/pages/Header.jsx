import React from "react";
import "../css/Header.css";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  return (
    <div className="Header_Container">
      <div className="Header_logo_Container">
        <img src="" alt="Logo" className="Logo_Header_image" />
      </div>
      <div className="Header_Search_Container">
        <div className="Header_search_box">
          {" "}
          <BiSearch  size={25}/> <input
            type="search"
            className="input_search_header"
            placeholder="Search e.g card"
          />{" "}
        </div>
        <div>
        <img src={""} alt="Logo" className="Job_Header_image" />
        </div>
      </div>
    </div>
  );
};

export default Header;
