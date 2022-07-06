/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Post.css";
import Modal from "react-modal";
import { BsImageFill } from "react-icons/bs";
import { FiYoutube } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useCookies } from "react-cookie";
import NewsFeed from "../NewsFeed/index";
// import { useNavigate } from "react-router-dom";

// const cards = [
//   {
//     imgURL: "/jinali-1.jpeg",
//     title: "Event Title - 1",
//     date: "14 Dec 2021",
//     price: "USD 200",
//     description: "Lorem ipsum",
//     id: "card-1",
//   },
//   {
//     imgURL: "/jinali-1.jpeg",
//     title: "Event Title - 1",
//     date: "14 Dec 2021",
//     price: "USD 200",
//     description: "Lorem ipsum",
//     id: "card-2",
//   },
//   {
//     imgURL: "/jinali-1.jpeg",
//     title: "Event Title - 1",
//     date: "14 Dec 2021",
//     price: "USD 200",
//     description: "Lorem ipsum",
//     id: "card-3",
//   },
// ];
const customStyles = {
  content: {
    width: "70vw",
    margin: "auto",
    height: "70vh",
  },
};
const Post = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(true);
  const { state } = useLocation();
  const [select, setSelect] = useState("");
  const [radio, setRadio] = useState("");
  const [description, setDescription] = useState("");
  const [subscription, setSubscription] = useState("");
  const [cookies, setCookies] = useCookies(["token"]);
  const [cardsdata, setCarddata] = useState([]);
  const navigate = useNavigate();

  const [postsToUpload, setPostsToUpload] = useState([
    { url: "/images/doc.png", type: "image", alt: "image" },
  ]);
  const [postsToUploadv, setPostsToUploadv] = useState([
    { url: "/images/doc.png", type: "image", alt: "image" },
  ]);
// get data....
  React.useEffect(() => {
    const requestOptions = {
      headers: {
        authorization: cookies.token,
      },
    };

    fetch(
      "https://api.dev.starclusive.com/api/feed/newsFeed?page=1&limit=3",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCarddata(result.result.result);
      })
      .catch((e) => console.log("Error", e));
  }, []);


  const addImageHandler = (e) => {
    setPostsToUpload((state) => [
      ...state,
      {
        url: URL.createObjectURL(e.target.files[0]),
        type: "image",
        alt: "image",
      },
    ]);
  };

  const addVideoHandler = (e) => {
    setPostsToUploadv((state) => [
      ...state,
      {
        url: URL.createObjectURL(e.target.files[0]),
        type: "video",
        alt: "video",
      },
    ]);
  };

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  var type = {
    normal: "normal",
   
  };
  const submit = (e) => {
    e.preventDefault();
    console.log("description : ", description);
    console.log("dropdown : ", select);
    console.log("radio : ", radio);
    console.log("subscfrip : ", subscription);
    // fetch
    let formData = new FormData();
    formData.append("description", description);
    formData.append("type", select);
    formData.append("isVideoURL", 0);
    formData.append("videoURL", 456);
    formData.append("nonSubscriberView", radio);
    formData.append("images[0]", JSON.stringify(postsToUpload));
    formData.append("videos[0]", 99);
    const requestOptions = {
      method: "POST",
      headers: { authorization: cookies?.token },
      body: formData,
    };
    fetch("https://api.dev.starclusive.com/api/post", requestOptions)
      .then((response) => response.json())
      .then((d) => {
        console.log("data", d);
        navigate("/post");
      })
      .catch((e) => console.log("Error", e));
  };

  function closeModal() {
    setIsOpen(false);
  }
  // console.log(cardsdata);
  return (
    <>
      <SideMenu />
      <div className="screen">
        <Header />
        <div className="main-content">
          <NewsFeed cardsdata={cardsdata} />
          <div>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              ariaHideApp={false}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="post-modal-container">
                <button type="button" className="closeBtn" onClick={closeModal}>
                  &times;
                </button>
                <h2 className="modal-title">Create Post</h2>

                <form className="post-modal-form" onSubmit={submit}>
                  <textarea
                    placeholder="Enter post Description Here.."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <select
                    className="post-dropdown"
                    value={select}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSelect(e.target.value);
                    }}
                  >
                    <option>Select one type</option>
                    <option value={type.normal}>Normal Post</option>
                    
                  </select>

                  <p>
                    Do you allow non-subscribers to watch this post for start
                  </p>

                  <div className="radio">
                    <span>
                      <input
                        type="radio"
                        checked={radio === "yes"}
                        value="yes"
                        name="radiobutton"
                        onChange={(e) => setRadio(e.target.value)}
                      />
                      Yes
                    </span>
                    <span>
                      <input
                        type="radio"
                        checked={radio === "no"}
                        value="no"
                        name="radiobutton"
                        onChange={(e) => setRadio(e.target.value)}
                      />{" "}
                      No
                    </span>
                  </div>

                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Startips for  Subscription.."
                    value={subscription}
                    onChange={(e) => setSubscription(e.target.value)}
                  />

                  <div className="add-post-container">
                    <div className="sub-text">
                      <h5>Add To these Post</h5>
                      <div className="round-imgs-container">
                        <label htmlFor="image-upload">
                          <i>
                            <BsImageFill />
                          </i>
                          <input
                            className="visually-hidden"
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={addImageHandler}
                          />
                        </label>
                        <label htmlFor="video-upload">
                          <i>
                            <FiYoutube />
                          </i>
                          <input
                            className="visually-hidden"
                            type="file"
                            id="video-upload"
                            accept="video/*"
                            onChange={addVideoHandler}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="uploaded-posts">
                      {postsToUpload.length > 0 &&
                        postsToUpload.map((val) => {
                          return (
                            <div key={val.url} className="uploaded-post">
                              <div>
                                <img
                                  src={val.url}
                                  id="img"
                                  alt={val.type}
                                ></img>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="uploaded-posts">
                      {postsToUploadv.length > 0 &&
                        postsToUploadv.map((val) => {
                          return (
                            <div key={val.url} className="uploaded-post">
                              <div>
                                <img
                                  src={val.url}
                                  id="img"
                                  alt={val.type}
                                ></img>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <button className="upload-modal-post-btn">Post</button>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
