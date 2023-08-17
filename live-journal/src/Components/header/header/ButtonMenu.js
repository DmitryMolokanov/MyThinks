function ButtonMenu() {
  return (
    <div className="block-button">
      <a href="/" className="buttons-menu">
        Home
      </a>
      <a href="/posts" className="buttons-menu">
        Posts
      </a>
      <a href="/my_posts" className="buttons-menu">
        My posts
      </a>
      <a href="/favorite_posts" className="buttons-menu">
        Favorite posts
      </a>
    </div>
  );
}
export default ButtonMenu;
