import React from "react";
import "./Home.css";
// import homeImage from "../assets/home.png"; // Adjust the path accordingly

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-content">
        <h1>Welcome to Soban Site</h1>
        <p>I Am a software Engineer</p>
        <p>
          Are you ready to take your business to the next level with
          cutting-edge IT solutions? Look no further! At Soban Nadeem, we
          specialize in providing innovative IT services and solutions tailored
          to meet your unique needs.
        </p>
        <div className="home-buttons">
          <a href="/contact" id="contact">
            Connect Now
          </a>

          <a href="/about" id="about">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
