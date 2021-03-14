import React, {FC} from "react";
import styled from "styled-components";
import {ref} from "yup";

interface InputProps {
    error?:boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  outline: none;
  padding: 0.5rem 0.4rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  border: 1px solid transparent;
  
  border-radius: 0.2rem;
  background-color:  #f2f4f5;
  &:focus {
    background-color:  #f2f4f5;
    border: 1px ${props => props.error ? "#d31616" : "#111111"} solid;
  }
`;

const Label = styled.label`
 width: 100%;
 font-family: 'Poppins', sans-serif;
 font-size: 1rem;
 margin-bottom: 0.4rem;
 font-weight: 600;
`;

const Error = styled.p`
 width: 100%;
 color: #d31616;
 font-family: 'Poppins', sans-serif;
 font-size: 0.9rem;
 margin-top: 0.2rem;
 margin-bottom: 0.2rem;
`;

const InputGroup = styled.fieldset`
  display: flex;
   width: 100%;
  flex-direction: column;
  margin-bottom: 0.4rem;
  outline: 0;
  padding: 0;
  border:0;
`;

interface TextInputProps {
    label : string;
    htmlFor : string;
    name : string;
    error?:string;
    refFor ?: any;
    [x:string]:any;
}

export const TextInput : FC<TextInputProps> = (
    {
        label,
        htmlFor,
        name,
        refFor,
        error,
        ...other
    }) => {
    return (
        <InputGroup>
            <Label htmlFor={htmlFor}>{label}</Label>
            <Input id={htmlFor} name={name} ref={refFor} {...other} error={!!error} type="text"/>
            {error&&<Error>{error}</Error>}
        </InputGroup>
    )
}