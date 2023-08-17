import { React, useRef, useState } from "react";
import MainMenu from "../MainMenu";
import "../../../styles/RegForm.css";
import { useNavigate } from "react-router-dom";

function RegForm() {
  let formUserName = useRef(null);
  let formPassword = useRef(null);
  let formName = useRef(null);
  let formLastName = useRef(null);
  const [sucAuth, setSucAuth] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [errorExist, setErrorExist] = useState(false);
  const navigate = useNavigate();

  function sendForm(event) {
    event.preventDefault();
    const userData = {
      userName: formUserName.current.value,
      password: formPassword.current.value,
      name: formName.current.value,
      lastname: formLastName.current.value,
      status: null,
      favoritePost: [],
    };
    formUserName.current.value = "";
    formPassword.current.value = "";
    formName.current.value = "";
    formLastName.current.value = "";

    const checkForm = Object.values(userData);
    if (checkForm.includes("")) {
      setSucAuth(false);
      setEmptyInput(true);
      return;
    } else setEmptyInput(false);

    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "match") {
          setErrorExist(true);
        } else {
          navigate("/");
        }
      });
  }

  return (
    <div>
      <MainMenu />
      <form action="" className="form">
        <div
          className="status"
          style={sucAuth ? { display: "block" } : { display: "none" }}
        >
          Successful
        </div>
        <div
          className="failFields"
          style={emptyInput ? { display: "block" } : { display: "none" }}
        >
          Fail! Complete all fields
        </div>

        <div
          className="failFields"
          style={errorExist ? { display: "block" } : { display: "none" }}
        >
          A user with this username already exists
        </div>

        <span className="form-span">Username:</span>
        <input ref={formUserName} type="text" className="form-input" />
        <span className="form-span">Password:</span>
        <input ref={formPassword} type="text" className="form-input" />
        <span className="form-span">Name:</span>
        <input ref={formName} type="text" className="form-input" />
        <span className="form-span">Lastname:</span>
        <input ref={formLastName} type="text" className="form-input" />
        <button className="form-btn" id="send" onClick={sendForm}>
          Send
        </button>
        <button
          className="form-btn"
          id="form-close"
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
export default RegForm;
