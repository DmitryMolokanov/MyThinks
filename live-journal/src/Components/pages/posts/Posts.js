import { useEffect, useState } from "react";
import MainMenu from "../../header/header/MainMenu";
import "../../styles/posts/Posts.css";

function Posts() {
  let userData = localStorage.getItem("user");
  let login = JSON.parse(userData);
  const [isData, setIsData] = useState(false);
  const [dataPosts, setDataPosts] = useState();
  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    fetch("/all_posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setIsData(true);
        setDataPosts(data);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  function chooseFavorite(e) {
    const postId = {
      userName: login.userName,
      id: e.target.firstElementChild.innerHTML,
    };
    fetch("/add_favorite_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postId),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsFavorite(data);
      });
  }

  // объект изменяетсяб но не отрисовывается
  function getFirstData() {
    const dataReverse = dataPosts.reverse();
    setDataPosts(dataReverse);
    console.log(dataPosts);
  }

  return (
    <div>
      <MainMenu />
      <div className="posts-fields">
        <div className="stat-block">
          <div className="info">
            <div className="info-title">Statistic: </div>
            {isData ? `Posts quantity: ${dataPosts.length}` : "err"} <br />
            {isData
              ? `Your posts: ${
                  dataPosts.filter((item) => item.userName === login.userName)
                    .length
                }`
              : "unknown"}{" "}
            <br />
            {isData
              ? `Last post: ${dataPosts[dataPosts.length - 1].date}`
              : "unknown"}
          </div>
        </div>
        <div className="all-post-field">
          <div className="settings-blok">
            <button className="settings-btn">Settings</button>
            <div className="settings-list">
              <button className="settings-btn" onClick={getFirstData}>
                first new
              </button>
              <button className="settings-btn">first old</button>
            </div>
          </div>

          {isData
            ? dataPosts.map((item) => {
                return (
                  <div className="post-blok" key={item._id}>
                    <div className="user-name">
                      {`User: ${item.userName}`}

                      <button
                        className="favorites-btn"
                        onClick={chooseFavorite}
                      >
                        add to favorites
                        <div style={{ display: "none" }}>{item._id}</div>
                      </button>
                    </div>
                    <div className="text-blok">{item.text}</div>
                    <div className="date-blok">
                      {`Publication date: ${item.date}`}
                    </div>
                  </div>
                );
              })
            : "Error"}
          {/* сдлать загрузку */}
        </div>
      </div>
    </div>
  );
}

export default Posts;
