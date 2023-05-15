import React from "react";
// import playStore from "../../../images/playstore1.png";
import appStore from "../../../images/appstore3.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        {/* <img src={playStore} alt="playstore" /> */}
        <div>
          <img src={appStore} alt="Appstore" />
        </div>
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Scarecrow17081999</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
