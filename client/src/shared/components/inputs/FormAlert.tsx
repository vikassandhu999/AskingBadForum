import React, { FC } from "react";
import "./inputs.style.scss";

interface FormAlertProps {
    message : string;
}

export const FormAlert : FC<FormAlertProps> = (params) => {
    return (
        <div className = "form-alert">
            <p>
                {params.message}
            </p>
        </div>
    )
}