import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/pages/home/Home";
import RegForm from "./Components/header/header/form/RegForm";
import AuthForm from "./Components/header/header/form/AuthForm";
import Posts from "./Components/pages/posts/Posts";
import MyPosts from "./Components/pages/my-posts/MyPosts";
import FavoritePosts from "./Components/pages/favorite-posts/FavoritePosts";
import LoginContext from "./context";

function App() {
  const [login, setLogin] = useState("");
  return (
    <LoginContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/registration" element={<RegForm />}></Route>
            <Route path="/authorization" element={<AuthForm />}></Route>
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/my_posts" element={<MyPosts />}></Route>
            <Route path="/favorite_posts" element={<FavoritePosts />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
