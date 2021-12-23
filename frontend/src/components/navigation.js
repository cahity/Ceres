import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from "../context/authenticationContext";

function Navigation() {
  const history = useHistory();
  const [loginState, setLoginState] = useContext(AuthenticationContext);

  const handleLogin = useCallback(
    () => history.push(`/authentication/${"login"}`),
    [history]
  );

  const handleHome = useCallback(() => history.push("/"), [history]);

  const handleMyPage = useCallback(() => history.push("/user"), [history]);

  function handleLogout() {
    localStorage.setItem("isLoggedIn", false);
    setLoginState({ isLoggedIn: false });

    handleHome();
  }

  return (
    <div>
      <div class="w3-top">
        <div class="w3-bar w3-ceres-main w3-card w3-left-align w3-large">
          <a
            class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-ceres-main"
            href="javascript:void(0);"
            onClick="myFunction()"
            title="Toggle Navigation Menu"
          >
            <i class="fa fa-bars"></i>
          </a>
          <a
            href="#"
            class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
            onClick={() => handleHome()}
          >
            Home
          </a>
          <a
            href="#"
            class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
          >
            About Us
          </a>
          {loginState.isLoggedIn && (
            <a
              href="#"
              class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
              onClick={() => handleMyPage()}
            >
              {loginState.username}
            </a>
          )}
          {loginState.isLoggedIn && (
            <a
              href="#"
              class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
              onClick={() => handleLogout()}
            >
              Logout
            </a>
          )}
          {!loginState.isLoggedIn && (
            <a
              href="#"
              class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
              onClick={() => handleLogin()}
            >
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
