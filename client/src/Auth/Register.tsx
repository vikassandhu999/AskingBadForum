import React, {useState} from "react";
import {AuthHeader, FormHeading, PaperAuthForm} from "./components";
import {TextInput} from "../XShared/Components/Inputs";
import {PrimaryButton} from "../XShared/Components/Buttons";
import {AlertError, Box, Container, XLink} from "../XShared/Components";
import {AUTH_ROUTES} from "./index.d";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "./auth.service";

interface IRegisterForm {
    email : string;
    password : string;
    fullName:string;
    userName : string;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    userName : yup.string().required(),
    fullName : yup.string().required()
});

export const Register = () => {
    const { register, handleSubmit,setError, errors } = useForm<IRegisterForm>({
        resolver : yupResolver(schema)
    });
    const [errorFromSubmit,setErrorFromSubmit] = useState<string | null>();

    const onSubmit = async (data : IRegisterForm) => {
        setErrorFromSubmit(null);
        const result = await authService.register(data);
        if(result.hasError && !!result.error) {
            if(result.error.httpCode===400 && result.error.errorInfo) {
                const errorInfo = result.error.errorInfo;
                console.log(errorInfo);
                if(errorInfo.email) setError("email", { message: errorInfo.email[0]} );
                if(errorInfo.password) setError("password", { message: errorInfo.password[0]} );
                if(errorInfo.fullName) setError("fullName", { message: errorInfo.fullName[0]} );
                if(errorInfo.userName) setError("userName", { message: errorInfo.userName[0]} );
            } else {
                setErrorFromSubmit(result.error.message);
            }
        }
    }
    return (
    <Container>
        <AuthHeader>
            <XLink
                info={"Already a member?"}
                title={"Sign in now"}
                to={AUTH_ROUTES.LOGIN}
                color={"#7263d4"}
            />
        </AuthHeader>
        <Box height={8}/>
        <PaperAuthForm  onSubmit={handleSubmit(onSubmit)}>
            <FormHeading>Register</FormHeading>
            {errorFromSubmit&&<AlertError>{errorFromSubmit}</AlertError>}
            <TextInput
                label={"Email"}
                name={"email"}
                htmlFor={"email"}
                refFor={register}
                error={errors.email? errors.email.message : undefined}
            />
            <TextInput
                label={"Username"}
                name={"userName"}
                htmlFor={"userName"}
                refFor={register}
                error={errors.userName? errors.userName.message : undefined}
            />
            <TextInput
                label={"Full Name"}
                name={"fullName"}
                htmlFor={"fullName"}
                refFor={register}
                error={errors.fullName? errors.fullName.message : undefined}
            />
            <TextInput
                label={"Password"}
                name={"password"}
                htmlFor={"password"}
                refFor={register}
                error={errors.password? errors.password.message : undefined}
            />
            <Box height={1}/>
            <PrimaryButton type={"submit"}>
                Register
            </PrimaryButton>
        </PaperAuthForm>
    </Container>
    )
}