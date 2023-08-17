import React, { useContext, useRef, useState } from "react";
import MainMenu from "../MainMenu";
import "../../../styles/AuthForm.css";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../../../context";

function AuthForm() {
  const formUserName = useRef(null);
  const formPassword = useRef(null);
  const [errAuth, setErrAuth] = useState(false);
  const navigate = useNavigate();
  const { setLogin } = useContext(LoginContext);

  function sendAuthorizationForm(event) {
    event.preventDefault();
    const userData = {
      userName: formUserName.current.value,
      password: formPassword.current.value,
    };

    fetch("/api/authorization", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "found") {
          setLogin(data);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
        if (data.status === null) {
          setErrAuth(true);
        }
      });

    formUserName.current.value = "";
    formPassword.current.value = "";
  }

  return (
    <div>
      <MainMenu />
      <form className="form-auth">
        <div
          className="err-auth"
          style={errAuth ? { display: "block" } : { display: "none" }}
        >
          Error! Check the entered data
        </div>
        <span className="span-form-auth">Username: </span>
        <input ref={formUserName} type="text" className="input-fom-auth" />
        <span className="span-form-auth">Password: </span>
        <input ref={formPassword} type="text" className="input-fom-auth" />
        <button
          className="btn-form-auth"
          id="check"
          onClick={sendAuthorizationForm}
        >
          Check
        </button>
        <button
          className="btn-form-auth"
          id="close"
          onClick={(event) => {
            event.preventDefault();

            navigate(-1);
          }}
        >
          Close
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
