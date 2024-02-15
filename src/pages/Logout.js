import React from "react";
import "../css/Logout.css";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="Logout">
      <div className="p-4 box mt-3 text-center">
        Welcome <br />
        {user && user.email}
      </div>
      <div className="">
        <button className="Logout_button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Logout;
