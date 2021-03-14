import React, {useState} from "react";
import {AuthHeader, FormHeading, PaperAuthForm} from "./components";
import {TextInput} from "../XShared/Components/Inputs";
import {PrimaryButton} from "../XShared/Components/Buttons";
import {AlertError, Box, Container, XLink} from "../XShared/Components";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {AUTH_ROUTES} from "./index.d";
import authService from "./auth.service";

interface IEmailVerificationForm {
    email : string;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
});

export const ForgotPassword = () => {
    const { register, handleSubmit,setError, errors } = useForm<IEmailVerificationForm>({
        resolver : yupResolver(schema)
    });
    const [errorFromSubmit,setErrorFromSubmit] = useState<string | null>();

    const onSubmit = async (data : IEmailVerificationForm) => {
        setErrorFromSubmit(null);
        const result = await authService.login(data);
        if(result.hasError && !!result.error) {
            if(result.error.httpCode===400 && result.error.errorInfo) {
                const errorInfo = result.error.errorInfo;
                console.log(errorInfo);
                if(errorInfo.email) setError("email", { message: errorInfo.email[0]} );
            } else {
                setErrorFromSubmit(result.error.message);
            }
        }
    }
    return (
        <Container>
            <AuthHeader>
                <XLink
                    title={"Sign up"}
                    to={AUTH_ROUTES.BASE}
                    color={"#7263d4"}
                />
                <XLink
                    title={"Sign in"}
                    to={AUTH_ROUTES.BASE}
                    color={"#7263d4"}
                />
            </AuthHeader>
            <Box height={8}/>
            <PaperAuthForm  onSubmit={handleSubmit(onSubmit)}>
                <FormHeading>Reset your password</FormHeading>
                {errorFromSubmit&&<AlertError>{errorFromSubmit}</AlertError>}
                <TextInput
                    label={"Email"}
                    name={"email"}
                    htmlFor={"email"}
                    refFor={register}
                    error={errors.email? errors.email.message : undefined}
                />
                <Box height={1}/>
                <PrimaryButton type={"submit"}>
                    Reset password
                </PrimaryButton>
            </PaperAuthForm>
        </Container>
    )
}