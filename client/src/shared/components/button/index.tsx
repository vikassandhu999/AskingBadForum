import React, { FC } from "react";
import "./button.styles.scss";

export interface CTAButtonProps {
    icon ?: Element;
    title : string;
    disabled ?: boolean;
    [x: string]: any;
}


export const CTAButton : FC<CTAButtonProps> = ({title,icon,disabled,...others}) => {
    return (
        <button
            disabled={disabled??false}
            className={"button cta-button"}
            {...others}
        >
            {icon&&<span>{icon}</span>}
            <p>{title}</p>
        </button>
    )
}