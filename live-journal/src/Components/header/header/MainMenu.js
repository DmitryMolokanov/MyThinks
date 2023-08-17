import { React } from "react";
import "../../styles/mainMenu.css";
import RegAuth from "./RegAuth";
import ButtonMenu from "./ButtonMenu";

function MainMenu() {
  return (
    <div>
      <div className="main-menu">
        <div className="reg-auth-block">
          <RegAuth />
        </div>{" "}
        <ButtonMenu />
      </div>
    </div>
  );
}
export default MainMenu;
