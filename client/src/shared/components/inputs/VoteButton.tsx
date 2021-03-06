import React from "react";
import "./inputs.style.scss";


export const VoteButton = () => {
    return (
        <div className="vote-button">
            <div className = "up-button">
                <i className="fal fa-thumbs-up"/>
            </div>
            <p>{34}</p>
            <div className = "up-button">
                <i className="fal fa-thumbs-down"/>
            </div>
        </div>
    )
}