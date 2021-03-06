import React, {FC} from "react";
import "./inputs.style.scss";

interface TextAreaInputProps {
    label: string;
    type?: string;
    name: string;
    htmlFor: string;
    error?: string;

    [x: string]: any;
}

export const TextAreaInput: FC<TextAreaInputProps> = (
    {
        label, name, htmlFor, error, ...others
    }) => {
    return (
        <div className="input-group">
            <label htmlFor={htmlFor}>{label}</label>
            <textarea
                rows={4}
                id={htmlFor}
                name={name}
                {...others}
            ></textarea>
            {error && (<p className="input-error">{error}</p>)}
        </div>
    )
}