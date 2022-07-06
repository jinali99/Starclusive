import React from "react";
import "./LeaderShipBoard.css";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";

import { useCookies } from "react-cookie";

const Post = () => {
  const [activeTab, setActiveTab] = React.useState("member");
  const [cookies] = useCookies(["token"]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const requestOptions = {
      headers: {
        authorization: cookies.token,
      },
    };
    fetch(
      "https://api.dev.starclusive.com/api/leadershipBoard?page=1&limit=10",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result.result);
        setData(result.result.result);
      })
      .catch((e) => console.log("Error", e));
  }, []);

  return (
    <>
      <SideMenu />
      <div className="screen">
        <Header />

        <div className="main-content">
          <div className="ls-container">
            <h3 className="h3">Leadership Board</h3>
            <div className="newsFeed-opts">
              <div
                className={`newsFeet-opt ${
                  activeTab === "member" ? "active" : ""
                } board-btn`}
                onClick={() => setActiveTab("member")}
              >
                Member
              </div>
              <div
                className={`newsFeet-opt ${
                  activeTab === "performer" ? "active" : ""
                } board-btn`}
                onClick={() => setActiveTab("performer")}
              >
                Performer
              </div>
            </div>
            <br /> <br /> <br></br>
            <div>
              {data.map((member) => {
                return (
                
                  <div className="ls-card" key={member.id}>
                    <div className="ls-card_img">
                      <img src={member.profile} />
                    </div>
                    <div className="ls-card_info">
                      <h3>{member.name}</h3>
                      <h3 className="ls-h5">Startips {member.totalSpending}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
