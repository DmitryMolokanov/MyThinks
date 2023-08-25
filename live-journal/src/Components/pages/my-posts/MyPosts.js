import React, { useEffect, useRef, useState } from "react";
import MainMenu from "../../header/header/MainMenu";
import getDate from "../home/getDate";
import "../../styles/my-posts/myPosts.css";

function MyPosts() {
  const userData = localStorage.getItem("user");
  const login = JSON.parse(userData);
  const [isData, setIsData] = useState(false);
  const [posts, setPosts] = useState();
  const [editForm, setEditForm] = useState(false);
  const [postId, setPostId] = useState();
  const editPostForm = useRef();

  useEffect(() => {
    fetch("/my_posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: login.userName }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        setIsData(true);
        setPosts(data);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  // функция вызывает окно для исправления поста

  function getFormEditText(event) {
    const id = event.target.firstChild.innerHTML;
    const post = posts.filter((p) => p._id === id);
    editPostForm.current.value = post[0].text;
    setPostId(id);
    setEditForm(true);
  }

  // функция закрывает окно для исправления поста
  function closeForm() {
    setEditForm(false);
  }

  // функция отправляет исправленный текст поста на сервер

  async function editText() {
    const editPost = {
      id: postId,
      text: editPostForm.current.value,
      date: `Updated (${getDate()})`,
    };
    await fetch("/edit_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editPost),
    });
  }

  return (
    <div>
      <MainMenu />
      <div className="all-blok">
        <form
          className="form-edit"
          style={
            editForm
              ? {
                  display: "flex",
                  flexDirection: "column",
                }
              : { display: "none" }
          }
        >
          <button className="close-form-edit" onClick={closeForm}>
            X
          </button>
          <textarea ref={editPostForm} cols="50" rows="20"></textarea>
          <button className="form-edit-btn" onClick={editText}>
            Edit
          </button>
        </form>

        <div className="blok-for-posts">
          {isData ? (
            posts.map((item, index) => {
              return (
                <div className="my-posts-blok" key={index}>
                  <button className="btn-edit-post" onClick={getFormEditText}>
                    <div style={{ display: "none" }}>{item._id}</div>
                    Edit post
                  </button>
                  <div className="my-posts-text">{item.text}</div>
                  <div className="date">{item.date}</div>
                </div>
              );
            })
          ) : (
            <h1>You haven't posted any yet</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPosts;
