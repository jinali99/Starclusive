/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";
import { CgFlagAlt } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import { GrImage } from "react-icons/gr";
import { HiShoppingBag } from "react-icons/hi";
import { useCookies } from "react-cookie";

import "./Info.css";
// import { useCookies } from "react-cookie";

const countries = [
  { id: "1", name: "INDIA" },
  { id: "2", name: "USA" },
  { id: "3", name: "SPAIN" },
  { id: "4", name: "MEXICO" },
  { id: "5", name: "Germany" },
];

const cities = [
  { id: "1", countryId: "1", name: "Mumbai" },
  { id: "2", countryId: "1", name: "Delhi" },
  { id: "3", countryId: "1", name: "Kolkata" },
  { id: "4", countryId: "1", name: "Bangalore" },

  { id: "1", countryId: "2", name: "Downers" },
  { id: "2", countryId: "2", name: "Grove" },

  { id: "1", countryId: "3", name: "Barcelona" },

  { id: "1", countryId: "4", name: "Puebla" },

  { id: "1", countryId: "5", name: "Duesseldorf" },
  { id: "2", countryId: "5", name: "Leinfelden-Echterdingen" },
  { id: "3", countryId: "5", name: "Eschborn" },
];

const info = () => {
  const [userdata, setUserdata] = useState("");
  const [name, setName] = React.useState("");
  const [errormsg, setErrorMsg] = React.useState(""); //for error msg
  const [email, setEmail] = React.useState(""); //for mail state
  const [selectDate, setselectDate] = React.useState(null);
  const [uname, setUname] = React.useState("");
  const [countryvalue, setCountryvalue] = React.useState("");
  const [cityValue, setCityvalue] = React.useState("");
  const [country, setCountry] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [shortbio, setShortbio] = useState("");
  const [item, setItem] = useState();
  const [cookies, setCookie] = useCookies(["token"]);
  const [image0, setImage0] = useState({ src: "", title: "" });
  const [image1, setImage1] = useState({ src: "", title: "" });
  const [image2, setImage2] = useState({ src: "", title: "" });
  const [image3, setImage3] = useState({ src: "", title: "" });

  React.useEffect(() => {
    setCountry(countries);
  }, []);

  React.useEffect(() => {
    const requestOptions = {
      headers: {
        authorization: cookies.token,
      },
    };

    //get data
    fetch("https://api.dev.starclusive.com/api/user/", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setUserdata(result);
      })
      .catch((e) => console.log("Error", e));
  }, []);

  const handleCountry = (id) => {
    const countryname = countries.filter((x) => x.id === id);
    const dt = cities.filter((x) => x.countryId === id);
    setCountryvalue(countryname);
    setCity(dt);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //patch data..

    fetch("https://api.dev.starclusive.com/api/user/updateProfile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: cookies?.token,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        uname: name,
        dateOfBirth: selectDate,
        referral_code: "",
        countryId: "138",
        cityId: "77663",
        selectedTopics: "3,4,5",
      }),
    })
      .then((response) => {
        console.log(response.status);
        // return response.json();
        // console.log("hellooo");
      })
      .then((data) => console.log(data));
    // console.log("Working");
  };

  //   fetch(`https://api.dev.starclusive.com/api/user/updateProfile`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: newdata.name,
  //       email: newdata.email,
  //       uname: newdata.name,
  //       dateOfBirth : newdata.dob

  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => setNewdata(result))
  //     .catch((err) => console.log('error: ', err))

  // }

  const uploadImageHandler = (imgBoxId, event) => {
    console.log(event.target);
    if (imgBoxId === "0") {
      setImage0({
        src: URL.createObjectURL(event.target.files[0]),
        title: "dummy",
      });
    }
    if (imgBoxId === "1") {
      setImage1({
        src: URL.createObjectURL(event.target.files[0]),
        title: "dummy",
      });
    }
    if (imgBoxId === "2") {
      setImage2({
        src: URL.createObjectURL(event.target.files[0]),
        title: "dummy",
      });
    }
    if (imgBoxId === "3") {
      setImage3({
        src: URL.createObjectURL(event.target.files[0]),
        title: "dummy",
      });
    }
  };

  return (
    <div className="root-info">
      <form onSubmit={submitHandler}>
        <div className="info-container">
          <p className="info-head">
            Please provide the following details for Profile Staclusive
          </p>

          <div className="info-inputs-container">
            <div className="info-inputDiv">
              <AiOutlineUser />
              <input
                type="text"
                placeholder={userdata?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="info-inputDiv">
              <AiOutlineMail />
              <input
                type="text"
                placeholder={userdata?.email}
                value={email}
                onChange={(e) => {
                  setErrorMsg("");
                  setEmail(e.target.value);
                }}
                required
              />
              {errormsg !== "" && <p>{errormsg}</p>}
            </div>

            <div className="info-inputDiv">
              <AiOutlineUser />
              <input
                type="text"
                placeholder={userdata?.name}
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                required
              />
            </div>

            <div className="info-inputDiv info-dateDiv">
              <MdDateRange />
              <DatePicker
                placeholderText={userdata?.dob}
                selected={selectDate}
                onChange={(date) => setselectDate(date)}
                required
              />
            </div>

            <div className="info-inputDiv">
              <CgFlagAlt />
              <select
                required
                id="ddlCountry"
                onChange={(e) => handleCountry(e.target.value)}
              >
                <option value="0">--Select Country--</option>
                {country && country !== undefined
                  ? country.map((ctr, index) => {
                      return (
                        <option key={index} value={ctr.id}>
                          {ctr.name}
                        </option>
                      );
                    })
                  : "No Country"}
              </select>
            </div>

            <div className="info-inputDiv">
              <GoLocation />
              <select
                id="ddlCity"
                value={cityValue}
                onChange={(e) => setCityvalue(e.target.value)}
                required
              >
                <option value="0">--Select City--</option>
                {city && city !== undefined
                  ? city.map((ctr, index) => {
                      return (
                        <option key={index} value={ctr.name}>
                          {ctr.name}
                        </option>
                      );
                    })
                  : "No city"}
              </select>
            </div>

            <div className="info-inputDiv info-inputDiv-w-100">
              <HiShoppingBag />
              <input
                type="text"
                placeholder="Short Bio"
                value={shortbio}
                onChange={(e) => setShortbio(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="info-imgs-container" htmlFor="input1">
            {/* image-1 */}
            <label htmlFor="image-upload0" className="info-imgInput">
              {image0.title ? (
                <img src={image0.src} className="info-img" />
              ) : (
                <GrImage className="info-img" />
              )}
              <input
                className="visually-hidden"
                type="file"
                id="image-upload0"
                accept="image/*"
                onChange={(event) => uploadImageHandler("0", event)}
              />
              <div className="info-icon">
                <label>{image0.title}</label>
              </div>
            </label>

            <label htmlFor="image-upload1" className="info-imgInput">
              {image1.title ? (
                <img src={image1.src} className="info-img" />
              ) : (
                <GrImage className="info-img" />
              )}
              <input
                className="visually-hidden"
                type="file"
                id="image-upload1"
                accept="image/*"
                onChange={(event) => uploadImageHandler("1", event)}
              />
              <div className="info-icon">
                <label>{image1.title}</label>
              </div>
            </label>

            <label htmlFor="image-upload2" className="info-imgInput">
              {image2.title ? (
                <img src={image2.src} className="info-img" />
              ) : (
                <GrImage className="info-img" />
              )}
              <input
                className="visually-hidden"
                type="file"
                id="image-upload2"
                accept="image/*"
                onChange={(event) => uploadImageHandler("2", event)}
              />
              <div className="info-icon">
                <label>{image2.title}</label>
              </div>
            </label>

            <label htmlFor="image-upload3" className="info-imgInput">
              {image3.title ? (
                <img src={image3.src} className="info-img" />
              ) : (
                <GrImage className="info-img" />
              )}
              <input
                className="visually-hidden"
                type="file"
                id="image-upload3"
                accept="image/*"
                onChange={(event) => uploadImageHandler("3", event)}
              />
              <div className="info-icon">
                <label>{image3.title}</label>
              </div>
            </label>
          </div>

          <div className="info-action-btns">
            <button className="info-btn info-save">Save</button> &nbsp; &nbsp;
            <button
              className="info-btn info-changePassword"
              onClick={() => {
                console.log("cp");
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default info;
