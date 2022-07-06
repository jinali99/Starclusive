import React, { useState } from "react";
import "./Registration.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { AiOutlineLock } from "react-icons/ai";
import { CgFlagAlt } from "react-icons/cg";
import { GrImage } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const countries = [
  { id: "1", name: "INDIA" },
  { id: "2", name: "USA" },
  { id: "3", name: "SPAIN" },
  { id: "4", name: "MEXICO" },
  { id: "5", name: "Germany" },
];

const idProofs = ["Aadhar Card", "Passport", "PAN Card"];

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

const style = {
  color: "rgb(173, 68, 86)",
};

const Registration = () => {
  const [errormsg, setErrorMsg] = useState(""); //for error msg
  const [uname, setUname] = useState("");
  const [errorimg, setErrorimg] = useState("");
  const [passerr, setPassErr] = useState("");
  const [passsword, setPassword] = useState("");
  const [Confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); //for mail state
  const [selectDate, setselectDate] = useState(null);
  const [profileImage, setProfileImage] = useState("/image/blankProfile.png"); //profile
  const [coverImg, setCoverImg] = useState(""); //cover img
  const [country] = useState(countries);
  const [city, setCity] = useState(cities);
  const [select, setSelect] = useState("");
  const [countryvalue, setCountryvalue] = useState("");
  const [cityValue, setCityvalue] = useState("");
  const navigate = useNavigate();
  const [uploadedId, setUploadID] = useState({
    imgFront: "",
    imgBack: "",
    imgWithFace: "",
    imgCurrentDateFace: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isAccept: "true",
        selectedTopics: "3,4,5",
        cityId: cityValue,
        countryId: countryvalue,
        userType: select,
        referral_code: "",
        dateOfBirth: selectDate,
        password: passsword,
        confirm_password: passsword,
        email: email,
        legalName: name,
        name: name,
        username: uname,
        coverImage: coverImg,
        profileImage: profileImage,
      }),
    };
    setCityvalue("")
    setConfirm("")
    setCoverImg("")
    setProfileImage("")
    setUname("")
    setName("")
    setEmail("")
    setUploadID("")

    fetch("https://api.dev.starclusive.com/api/user/sign-up", requestOptions)
      .then((response) => response.json())
      .then((d) => {
        console.log("data", d);

        navigate("/login");
      })
      .catch((e) => console.log("Error", e));

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      setErrorMsg("This Mail is Not valid!");
    }

    if (passsword !== Confirm) {
      setPassErr("Password & conform password are not same!");
    }

    const objectToSend = {
      name,
      passsword,
      countryvalue,
      cityValue,
      uname,
      email,
      selectDate,
      select,
    };
    console.log(objectToSend);
  };

  const handleCountry = (id) => {
    const countryname = countries.filter((x) => x.id === id);
    const dt = cities.filter((x) => x.countryId === id);
    setCountryvalue(countryname);
    setCity(dt);
  };

  const profileImageHandler = (e) => {
    if (e.target.files[0].size < 2097152) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setErrorimg("image size must be 2 mb");
    }
  };

  const coverImageHandler = (e) => {
    if (e.target.files[0].size < 2097152) {
      setCoverImg(URL.createObjectURL(e.target.files[0]));
    } else {
      setErrorimg("image size must be 2 mb");
    }
  };

  const uploadImageHandler = (imgName, event) => {
    setUploadID((state) => ({
      ...state,
      [imgName]: URL.createObjectURL(event.target.files[0]),
    }));
  };

  return (
    <div className="registration">
      <div className="welcome-back-container">
        <img src="/image/Register.png" alt="" />
      </div>

      <div className="registration-form-container">
        <div>
          <div className="title">
            <h2 className="reg-h2">Welcome to the Starcluive</h2>
            <p>
              Please provide the following details for Registration in
              Starcluive
            </p>
          </div>

          <form className="registration-form" onSubmit={submitHandler}>
            <div className="upload-photo-container">
              <div className="round-image-container">
                <img src={profileImage} id="img" alt=""></img>
              </div>
              <input
                type="file"
                id="input"
                accept="image/jpeg , image/jpg , image/png"
                onChange={profileImageHandler}
              />
              <label htmlFor="input">
                <i>Upload Profile Photo</i>
              </label>
              {errorimg && <p>{errorimg}</p>}
            </div>
            <div className="upload-cover-container">
              <div className="image-square-container">
                {coverImg ? (
                  <img src={coverImg} id="img2" alt="" />
                ) : (
                  <GrImage />
                )}
              </div>
              <input
                type="file"
                id="input1"
                accept="image/jpeg , image/jpg , image/png"
                onChange={coverImageHandler}
                alt=""
              />
              <label htmlFor="input1">
                <i>Upload Cover Photo</i>
              </label>
            </div>
            <div className="inputDivs">
              <span>
                <AiOutlineUser />
              </span>
              <select onChange={(e) => setSelect(e.target.value)} required>
                <option>Registered as</option>
                <option>Member</option>
                <option>Perfomer</option>
              </select>
            </div>
            <div className="inputDivs">
              <span>
                <AiOutlineUser />
              </span>
              <input
                type="text"
                placeholder="Name"
                className="reg-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="inputDivs">
              <span>
                <AiOutlineMail />
              </span>
              <input
                type="text"
                placeholder="Email id"
                className="reg-input"
                value={email}
                onChange={(e) => {
                  setErrorMsg("");
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            {errormsg !== "" && <p>{errormsg}</p>}
            <div className="inputDivs">
              <span>
                <AiOutlineUser />
              </span>

              <input
                type="text"
                placeholder="User Name"
                className="reg-input"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                required
              />
            </div>
            <div className="inputDivs date-inputDivs">
              <span>
                <MdDateRange />
              </span>
              <div>
                <DatePicker
                  className="reg-input"
                  placeholderText="Enter Date of Birth"
                  selected={selectDate}
                  onChange={(date) => setselectDate(date)}
                  required
                />
              </div>
            </div>
            <div className="inputDivs">
              <span>
                <CgFlagAlt />
              </span>
              <select
                required
                id="ddlCountry"
                className="reg-select"
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
            <div className="inputDivs">
              <span>
                <GoLocation />
              </span>
              <select
                id="ddlCity"
                className="reg-select"
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
            
            <div className="inputDivs">
              <span>
                <AiOutlineLock />
              </span>
              <input
                type="password"
                placeholder="New Passsword"
                className="reg-input"
                value={passsword}
                onChange={(e) => {
                  setPassErr("");
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            {passerr !== "" && <p>{passerr}</p>}
            <div className="inputDivs">
              <span>
                <AiOutlineLock />
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="reg-input"
                value={Confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <div className="inputDivs">
              <span>
                <GoLocation />
              </span>
              <select onChange={(e) => setSelect(e.target.value)} required>
                <option value={""}>Choose ID</option>
                {idProofs.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputDivs">
              <span>{/* <GoLocation /> */}</span>
              <input
                type="text"
                placeholder="Document Number"
                className="reg-input"
                required
              />
            </div>

            <div className="id-proof-image-holder">
              <label htmlFor="imgFront" className="registration-imgInput">
                {uploadedId.imgFront ? (
                  <img
                    className="passport-img"
                    src={uploadedId.imgFront}
                    alt="passport front"
                  ></img>
                ) : (
                  <GoLocation className="passport-img" />
                )}
                <input
                  className="visually-hidden"
                  type="file"
                  id="imgFront"
                  accept="image/*"
                  onChange={(event) => uploadImageHandler("imgFront", event)}
                />
              </label>

              <label htmlFor="imgBack" className="registration-imgInput">
                {uploadedId.imgBack ? (
                  <img
                    className="passport-img"
                    src={uploadedId.imgBack}
                    alt="passport back"
                  ></img>
                ) : (
                  <GoLocation className="passport-img" />
                )}
                <input
                  className="visually-hidden"
                  type="file"
                  id="imgBack"
                  accept="image/*"
                  onChange={(event) => uploadImageHandler("imgBack", event)}
                />
              </label>

              <label htmlFor="imgWithFace" className="registration-imgInput">
                {uploadedId.imgWithFace ? (
                  <img
                    className="passport-img"
                    src={uploadedId.imgWithFace}
                    alt="passport with face"
                  ></img>
                ) : (
                  <GoLocation className="passport-img" />
                )}
                <input
                  className="visually-hidden"
                  type="file"
                  id="imgWithFace"
                  accept="image/*"
                  onChange={(event) => uploadImageHandler("imgWithFace", event)}
                />
              </label>

              <label
                htmlFor="imgCurrentDateFace"
                className="registration-imgInput"
              >
                {uploadedId.imgCurrentDateFace ? (
                  <img
                    className="passport-img"
                    src={uploadedId.imgCurrentDateFace}
                    alt="passport front"
                  ></img>
                ) : (
                  <GoLocation className="passport-img" />
                )}
                <input
                  className="visually-hidden"
                  type="file"
                  id="imgCurrentDateFace"
                  accept="image/*"
                  onChange={(event) =>
                    uploadImageHandler("imgCurrentDateFace", event)
                  }
                />
              </label>
            </div>

            <div className="tc-container">
              <input type="checkbox"></input>
              <label>
                &nbsp; Agreed on <span style={style}>Terms & Conditions</span>
              </label>
            </div>
            <button className="registration-button">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
