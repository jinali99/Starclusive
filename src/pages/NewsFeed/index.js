/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./NewsFeed.css";

const NewsFeed = (props) => {
  const [activeTab, setActiveTab] = useState("event");
  console.log("cards", activeTab);
  return (
    <div className="root-newsFeed">
      <div className="newsFeed-opts">
        <div
          className={`newsFeet-opt ${activeTab === "feeds" ? "active" : ""} `}
          onClick={() => setActiveTab("feeds")}
        >
          Feeds
        </div>
        <div
          className={`newsFeet-opt ${activeTab === "event" ? "active" : ""} `}
          onClick={() => setActiveTab("event")}
        >
          Event
        </div>
      </div>
      <div className="hero-section">
        <h2>My Favorites</h2>
        <div className="fav-cards">
          {props?.cardsdata?.map((state) => {
            console.log(state);
            return (
              <div key={state.id} className="fav-card">
                <div className="fav-card-img">
                  <img src={state.imgURL} alt={state.title} />
                </div>
                <div className="fav-card-head">
                  <h4>{state.description}</h4>
                  <p>{state.type}</p>
                  <p>{state.subscription}</p>

                </div>
               
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
