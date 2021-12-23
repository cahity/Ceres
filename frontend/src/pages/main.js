import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import nodebased from "../images/nodebased.webp";
import cloudImage from "../images/cloud-network.webp";
import networkImage from "../images/network.webp";
//import "./css/index.css";
//import "./css/style.css";
//import "./css/landingPage.css";
//import "./css/userPage.css";
//import "./css/dragAndDrop.css";
function Main() {
  const history = useHistory();

  const handleGetStarted = useCallback(
    () => history.push(`/authentication/${"signup"}`),
    [history]
  );

  return (
    <div>
      <header
        class="w3-container w3-ceres-main w3-center"
        style={{ padding: "128px 16px" }}
      >
        <h1 class="w3-margin w3-jumbo">CERES</h1>
        <p class="w3-xlarge">Online Machine Learning Platform</p>
        <button
          type="button"
          class="w3-button getStartedButton w3-padding-large w3-large w3-margin-top"
          onClick={() => handleGetStarted()}
        >
          <p class="getStartedButtonText">Get Started</p>
        </button>
      </header>

      <ul class="mainPageRow">
        <li className="mainPageLeft">
          <h1>Graph Based Node Editor</h1>
          <h5 class="w3-padding-32">
            Implement your Machine Learning model with graph based node editor
            within your browser! <br></br> <br></br> Ceres provides essential
            nodes for Machine Learning algoritmhs. Drag/drop nodes, tweak
            parameters and connect them! <br></br> <br></br> Below is a list of
            operations supported by nodes. <br></br> <br></br>
            <ul className="landingPageFeatureList">
              <li>Data creation from .csv files</li>
              <li>Data modification (scaling, shuffling, etc.)</li>
              <li>Data plotting</li>
              <li>Model creation (linear regression, k-means, etc.)</li>
              <li>Model training</li>
              <li>Model visualization</li>
            </ul>
          </h5>
        </li>
        <li className="mainPageLeft">
          <img src={nodebased} />
        </li>
      </ul>

      <ul class="mainPageRow">
        <li className="mainPageLeft">
          <img src={cloudImage} />
        </li>
        <li className="mainPageLeft">
          <h1>Cloud Solution for Datasets</h1>
          <h5 class="w3-padding-32">
            Upload your datasets to Ceres and access them anytime/anywhere you
            want! <br></br> <br></br> Ceres provides storage for your datasets.
            You can use your datasets to train your models.
          </h5>
        </li>
      </ul>

      <ul class="mainPageRow">
        <li className="mainPageLeft">
          <h1>Social Hub</h1>
          <h5 class="w3-padding-32">
            Ceres is the Github of Machine Learning developers! Connect with
            Machine Learning developers all alone the world. <br></br> <br></br>
            On Ceres platform you can; <br></br> <br></br>
            <ul className="landingPageFeatureList">
              <li>Mark your work environment public or privete</li>
              <li>Browse public work environments</li>
              <li>Star work environments</li>
              <li>Fork public work environments</li>
            </ul>
          </h5>
        </li>
        <li className="mainPageLeft">
          <img src={networkImage} />
        </li>
      </ul>
    </div>
  );
}

export default Main;
