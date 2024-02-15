import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/Dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="loiginparent">
        <div class="loginconatiner  center">
          <div className="imageandtext">
            <div>
              <img
                src="https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-login-button-icon-126999949.jpg"
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
                  name="email"
                />
              </div>
              <div className="input-divs">
                <h2>Password🔑</h2>
                <div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Input your Password here "
                  />
                <button onClick={toggleShowPassword}>show password</button>
                </div>
              </div>

              <div className="submit">
                <button>signin</button>
              </div>
              <div className="p-4 box mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="Link">
                  signUp
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
