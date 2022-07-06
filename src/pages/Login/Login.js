/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [errormsg, setErrorMsg] = useState(""); //for error msg
  const [passerr, setPassErr] = useState("");
  const [passsword, setPassword] = useState("");
  const [email, setEmail] = useState(""); //for mail state
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const submit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: passsword,
        deviceId: "d5b5881d-ccd3-44a7-b630-8b23972739be"
      }),
    };
    //login-id-pass:  uvesh123@yopmail.com  pss-Uvesh@1234

    fetch("https://api.dev.starclusive.com/api/user/sign-in", requestOptions)
      .then((response) => response.json())
      .then((d) => {
        console.log("data", d);
        setCookie("token", d?.token);
        navigate("/post");
      })
      .catch((e) => console.log("Error", e));

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      setErrorMsg("This Mail is Not valid!");
    }
  };

  return (
    <>
      <div className="login">
        <div className="welcome-back-container">
          <img src="/image/login.png" alt="" />
        </div>

        <div className="login-form-container">
          <div className="title">
            <h2>Welcome to the Starcluive</h2>
            <p>
              Please provide the following details for Registration in
              Starcluive
            </p>
          </div>
          <div>
            <form className="login-form" onSubmit={submit}>
              <div className="inputDivs">
                <span>
                  <AiOutlineMail />
                </span>
                <input
                  type="text"
                  placeholder="Email id"
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
                  <AiOutlineLock />
                </span>
                <input
                  type="text"
                  placeholder="New Passsword"
                  value={passsword}
                  onChange={(e) => {
                    setPassErr("");
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              {passerr !== "" && <p>{passerr}</p>}

              <h5 className="h5">Forgot Password?</h5>
              <div>
                <button className="log-button">Login</button>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="round"> </div> */}
        {/*  <div className="full-round"></div>
        <div className="small-round"></div>
        <div className="round-corner"></div> */}
      </div>
    </>
  );
};

export default Login;
