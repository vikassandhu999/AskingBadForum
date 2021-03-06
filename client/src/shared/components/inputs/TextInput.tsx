import React , {FC} from "react";
import "./inputs.style.scss";

interface TextInputProps {
    label:string;
    type?:string;
    name:string;
    htmlFor:string;
    error ?: string;
    [x: string]: any;
}

export const TextInput :FC<TextInputProps> = ({
    label, type, name, htmlFor, error,...others}) => {
    return (
        <div className="input-group">
            <label htmlFor={htmlFor}>{label}</label>
            <input
                id={htmlFor}
                type={type??"text"}
                name = {name}
                {...others}
            />
            {error&&(<p className = "input-error">{error}</p>)}
        </div>
    )
}