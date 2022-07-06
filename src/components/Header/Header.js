import React from 'react'
import { RiBook2Fill } from "react-icons/ri";
import { BsBellFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import './Header.css';
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    return (
        <header >
            {/* Search Bar */}
            <div className="header-search-container">
                <span>
                    <BsSearch size={32} />
                </span>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search "
                    name="s"
                    className="search-input"
                />
            </div>

            {/* Header Options */}
            <div className="header-opt ">
                <RiBook2Fill size={40} />
            </div>
            <div className="header-opt ">
                <BsBellFill size={40} />
            </div>
            <div className="header-opt last" onClick={() =>{navigate("/manageprofile")} }>
                <img src="/image/profile.jpeg" alt=""  />
            </div>

        </header>
    )
}

export default Header