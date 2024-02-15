import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserAuth } from "../context/UserAuthContext";

import "../css/Login.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="loiginparent">
        <div class="loginconatiner center">
          <div className="imageandtext">
            <div>
              <img
                src="https://www.freeiconspng.com/thumbs/sign-up-button-png/sign-up-now-button-png-16.png"
                alt=""
                className="loginimage"
              />
            </div>
          </div>
          {error && alert({ error })}
          <div>
            <form action="" onSubmit={handleSubmit}>
              <div className="input-divs">
                <h2>Email 📧 </h2>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Input your Email here "
                />
              </div>
              <div className="input-divs">
                <h2>Password🔑</h2>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Input your Password here "
                />
              </div>
              <div className="submit">
                <button>signup</button>
              </div>
              <div className="p-4 box mt-3 text-center">
                Already have an account?{" "}
                <Link to="/" className="Link">
                  login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
