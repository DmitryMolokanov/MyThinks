import React, { useEffect, useState } from "react";
import MainMenu from "../../header/header/MainMenu";
import "../../styles/my-posts/myPosts.css";

function MyPosts() {
  const userData = localStorage.getItem("user");
  const login = JSON.parse(userData);
  const [isData, setIsData] = useState(false);
  const [posts, setPosts] = useState();

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

  return (
    <div>
      <MainMenu />
      <div className="all-blok">
        <div className="blok-for-posts">
          {isData
            ? posts.map((item) => {
                return (
                  <div className="my-posts-blok">
                    <div className="my-posts-text">{item.text}</div>
                    <div className="date">{item.date}</div>
                  </div>
                );
              })
            : "Error"}
        </div>
      </div>
    </div>
  );
}

export default MyPosts;
