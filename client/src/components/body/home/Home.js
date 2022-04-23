import React from "react";
import "./home.css";
import Stethscope from "../../../images/stethoscope.jpg";

function Home() {
  return (
    <div className="home_page">
      <div className="home">
        <a href="/symptom_checker">
          <img className="open-button" src={Stethscope} />
        </a>
        <h1>Home</h1>
      </div>
    </div>
  );
}

export default Home;
