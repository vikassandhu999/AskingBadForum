import React, { FC } from "react";
import "./header.style.scss";
import { Link } from "react-router-dom";

interface HeaderComponentProps {

}

export const HeaderComponent : FC<HeaderComponentProps> = () => {
    return (
        <header className={"header"}>
            <div className = "header-wrapper container">
                <div className = "header-logo">
                    <Link to={"/"}>
                        <h2>askingBad</h2>
                    </Link>
                </div>

                <div className= "header-actions">
                    <div className = "action action-icon">
                        <i className = "far fa-search"/>
                    </div>
                    <div className = "action action-icon">
                        <i className = "far fa-bell"/>
                    </div>
                    <div className="action header-avatar">
                        <img src = "https://cdn.dribbble.com/users/30589/avatars/normal/bc1a7a55b777eb033566567dfbe9ceb1.jpg?1598200961&compress=1&resize=40x40"/>
                    </div>
                </div>
            </div>
        </header>
    );
}