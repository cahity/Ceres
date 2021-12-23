import axios from "axios";
import React, { useCallback, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from "../context/authenticationContext";

function Authentication(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [isSignUp, setIsSignUp] = useState(
    props.match.params.isSignUp === "signup"
  );
  const history = useHistory();
  const finalizeLogin = useCallback(() => history.push("/user/"), [history]);
  const [loginState, setLoginState] = useContext(AuthenticationContext);

  function handleLogin(event) {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      username: username,
      password: password,
    });

    axios
      .post("http://127.0.0.1:8090/api/signin", body, authConfig)
      .then((res) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        setLoginState({ isLoggedIn: true, username: username });
        finalizeLogin();
        console.log(res.data);
        console.log(localStorage);
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  }

  function handleSignUp(event) {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      username: username,
      password: password,
      email: mailAddress,
    });

    axios
      .post("http://127.0.0.1:8090/api/signup", body, authConfig)
      .then((res) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username);
        localStorage.setItem("token", res.data.token);
        setLoginState({ isLoggedIn: true, username: username });
        finalizeLogin();
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  }

  function handleChangeIsSignUp(isSignUp) {
    setUsername("");
    setPassword("");
    setMailAddress("");
    setIsSignUp(isSignUp);
  }

  return (
    <div>
      <div className="login-page">
        <div className="form">
          {isSignUp && (
            <form
              className="login-form"
              type="submit"
              onSubmit={(evt) => handleSignUp(evt)}
            >
              <input
                type="text"
                placeholder="name"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="email address"
                onChange={(e) => setMailAddress(e.target.value)}
              />
              <button>create</button>
              <p className="message">
                Already registered?{" "}
                <a href="#" onClick={() => handleChangeIsSignUp(false)}>
                  Sign In
                </a>
              </p>
            </form>
          )}
          {!isSignUp && (
            <form
              className="login-form"
              type="submit"
              onSubmit={(evt) => handleLogin(evt)}
            >
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button>login</button>
              <p className="message">
                Not registered?{" "}
                <a href="#" onClick={() => handleChangeIsSignUp(true)}>
                  Create an account
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authentication;
