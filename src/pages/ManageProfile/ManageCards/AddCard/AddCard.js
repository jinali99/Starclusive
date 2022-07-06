/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import "./AddCard.css";
import Modal from "react-modal";
import { BsCreditCard } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import DatePicker from "react-datepicker";
import { MdDateRange } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const AddCard = ({ openAddCardModal, setOpenAddCardModal, addCardHandler }) => {
  let subtitle;

  // https://api.stripe.com/v1/tokens

  const [cardNumber, setCardNumber] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [cardHolderName, setCardHolderName] = React.useState("");
  const [selectDate, setSelectedData] = React.useState(null);
  const [cookies, setCookies] = useCookies(["token"]);
  const [data, newData] = React.useState({});
  const [tempToken, settempToken] = React.useState("");
  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };
  // get data
  // data = {};
  React.useEffect(() => {
    const requestOptions = {
      headers: {
        authorization: cookies.token,
      },
    };
    fetch("https://api.dev.starclusive.com/api/card", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        addCardHandler(result);
        // newData(result);
      })
      .catch((e) => console.log("Error", e));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const date = new Date(selectDate);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let data = {
      "card[name]": cardHolderName,
      "card[number]": cardNumber,
      "card[cvc]": cvv,
      "card[exp_month]": parseInt(month),
      "card[exp_year]": parseInt(year),
      guid: "264ef4c9-a79d-4805-b746-77d88d03eac52ec5e1",
      muid: "bf20a9a4-d6b9-4bcd-8017-d3f2645ea8c52681fb",
      sid: "e9f1c810-a344-4233-a731-6a51785b029b92d235",
      payment_user_agent: "stripe.js/a928bb833;+stripe-js-v3/a928bb833",
      time_on_page: 16498,
      key: "pk_test_51IUaEtKvww4b0ijcoNgwhZ9lrkyORD4dYLL0mry0nim9bmPnbuPA0mYZuKfMP9OveS9u4uH14awwEOCCopktw8Kw004075CoTi",
    };
    let formData = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formData.push(encodedKey + "=" + encodedValue);
    }
    formData = formData.join("&");
    console.log("Data", formData);
    console.log("Token from cookie", cookies);
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        // Authorization: "Bearer " + cookies.token,
      },
      body: formData,
    };
    fetch("https://api.stripe.com/v1/tokens", requestOptions)
      .then((response) => response.json())
      .then((d) => {
        settempToken(d.id);
      })
      .catch((e) => console.log("Error", e));
    console.log(tempToken);
    fetch("https://api.dev.starclusive.com/api/card", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: cookies.token,
      },
      body: JSON.stringify({ cardToken: tempToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((e) => console.log("Error", e));
  };
  return (
    <div className="root-addCard">
      <Modal
        isOpen={openAddCardModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setOpenAddCardModal(false)}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={submitHandler}>
          <div className="addCard-root">
            <button
              type="number"
              className="addCard-close-btn"
              onClick={() => setOpenAddCardModal(false)}
            >
              &times;
            </button>
            <h2 className="add-head">Add New Card</h2>

            <p className="addCard-head">
              Please provide the following details for your card{" "}
            </p>
            <div className="addCard-inputs-container">
              <div className="addCard-inputDiv addCard-inputDiv-w-100">
                <BsCreditCard />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="addCard-inputDiv addCard-inputDiv-w-100">
                <AiOutlineUser />
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  required
                />
              </div>

              <div className="addCard-inputDiv">
                <MdDateRange />
                <DatePicker
                  placeholderText="Valid Date"
                  selected={selectDate}
                  onChange={(date) => setSelectedData(date)}
                  required
                />
              </div>

              <div className="addCard-inputDiv">
                <AiOutlineUser />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  max={3}
                />
              </div>
            </div>
            <div className="addCard-action-btns">
              <button className="addCard-btn addCard-save">Save</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCard;
