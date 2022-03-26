import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

function Header() {
  let navigate = useNavigate();
  let location = useLocation();
  let pagePath = location.pathname;

  console.log(pagePath);
  if(pagePath === "/") {
    return (
      <header>
        <h1>CINEFLEX</h1>
      </header>
    )
  }
  else{
    return (
        <header>
          <h1>CINEFLEX</h1>
          <ion-icon name="arrow-back-outline" onClick={()=>navigate(-1)}></ion-icon>
        </header>
    )
  }
}

export default Header;