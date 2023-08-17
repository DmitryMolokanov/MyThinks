import React, { useEffect, useState } from "react";
import MainMenu from "../../header/header/MainMenu";
import "../../styles/favorite-post/FavoritePosts.css";

function FavoritePosts() {
  const userName = localStorage.getItem("user");
  const login = JSON.parse(userName);
  const [posts, setPosts] = useState();
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    fetch("/my_favorite_posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: login.userName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsData(true);
        setPosts(data);
      });
  });

  function removePost(e) {
    const dataForRemove = {
      id: e.target.firstElementChild.innerHTML,
      userName: login.userName,
    };
    fetch("/remove_favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForRemove),
    });
  }

  return (
    <div>
      <MainMenu />
      <div className="posts-fields">
        <div className="all-post-field">
          {isData && posts.length > 0
            ? posts.map((item) => {
                return (
                  <div className="post-blok" key={item._id}>
                    <div className="user-name">
                      {item.userName}
                      <button className="remove-favorite" onClick={removePost}>
                        Remove from favorites
                        <div style={{ display: "none" }}>{item._id}</div>
                      </button>
                    </div>
                    <div className="text-blok">{item.text}</div>
                    <div className="date-blok">{item.date}</div>
                  </div>
                );
              })
            : "You haven't chosen your favorite post yet"}
        </div>
      </div>
    </div>
  );
}

export default FavoritePosts;
