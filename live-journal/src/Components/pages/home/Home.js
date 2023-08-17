import React, { useRef, useState } from "react";
import MainMenu from "../../header/header/MainMenu";

import "../../styles/home/Home.css";
import getDate from "./getDate";

function Home() {
  const dataTextarea = useRef(null);
  const [noText, setNoText] = useState(false);
  const [noteAuth, setNoteAuth] = useState(false);
  let userData = localStorage.getItem("user");
  let login = JSON.parse(userData);

  function sendTextarea() {
    if (!login.userName) {
      setNoteAuth(true);
      return;
    }

    const dataPost = {
      userName: login.userName,
      text: dataTextarea.current.value,
      date: getDate(),
    };
    const checkPost = Object.values(dataPost);
    if (checkPost.includes("")) {
      setNoText(true);
      return;
    } else setNoText(false);
    fetch("/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataPost),
    });
    dataTextarea.current.value = "";
  }

  return (
    <div className="home-page">
      <div>
        <MainMenu />
      </div>
      <div className="home-field">
        <div
          className="error-text"
          style={noText ? { display: "block" } : { display: "none" }}
        >
          Sending empty messages is prohibited
        </div>
        <div
          className="error-text"
          style={noteAuth ? { display: "block" } : { display: "none" }}
        >
          Login or register to create a post
        </div>
        <h3 className="home-title">
          Hello {login.userName}! You can write your post in the field below
        </h3>
        <textarea
          ref={dataTextarea}
          className="home-textarea"
          cols="70"
          rows="20"
        ></textarea>{" "}
        <div>
          <button
            className="home-btn"
            id="clear"
            onClick={() => {
              dataTextarea.current.value = "";
            }}
          >
            Clear
          </button>
          <button className="home-btn" id="send" onClick={sendTextarea}>
            Send post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
