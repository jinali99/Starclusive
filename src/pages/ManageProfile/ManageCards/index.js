import React, { useState } from "react";
import AddCard from "./AddCard/AddCard";
import "./manageCards.css";
import { MdLiveTv } from "react-icons/md";

// const dummyCards = [
//   {
//     bankName: "Bank of America",
//     accNo: "xxxx-xxxx-xxxx-2312",
//     validTill: 2024,
//     imageURL: "",
//   },
//   {
//     bankName: "Bank of America",
//     accNo: "xxxx-xxxx-xxxx-2432",
//     validTill: 2024,
//     imageURL: "",
//   },
//   {
//     bankName: "Bank of America",
//     accNo: "xxxx-xxxx-xxxx-3132",
//     validTill: 2024,
//     imageURL: "",
//   },
// ];

const ManageCards = () => {
  const [activeCard, setActiveCard] = useState(false);
  const [cards, setCards] = useState(null);
  const [openAddCardModal, setOpenAddCardModal] = useState(false);

  const addCardHandler = (data) => {
    setCards(data);
  };
  return (
    <>
      <div className="root-manage-cards">
        <div className="root-cards">
          {cards?.map((card) => {
            return (
              <div
                key={card.last4}
                className={`${
                  activeCard === card.name ? "active-cred-card" : ""
                } added-card`}
                onClick={() => setActiveCard(card.name)}
              >
                <div className="card-bank">
                  <p className="card-bank-name">{card.name}</p>
                  <span>***</span>
                </div>

                <p className="card-number">{`xxxx-xxxx-xxxx-${card.last4}`}</p>
                <div className="card-validity">
                  valid-<span>{card.exp_year}</span>
                </div>
                <span>{card.imageURL}</span>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setOpenAddCardModal(true)}
          className="add-card-btn"
        >
          <MdLiveTv />
          Add New Card
        </button>
      </div>

      {/* Add Card Modal */}
      <AddCard
        openAddCardModal={openAddCardModal}
        setOpenAddCardModal={setOpenAddCardModal}
        addCardHandler={addCardHandler}
      />
    </>
  );
};

export default ManageCards;
