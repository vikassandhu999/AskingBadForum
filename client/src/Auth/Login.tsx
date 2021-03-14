import React , {useState , useEffect} from "react";
import {AuthHeader, FormHeading, PaperAuthForm} from "./components";
import {TextInput} from "../XShared/Components/Inputs";
import {PrimaryButton} from "../XShared/Components/Buttons";
import {AlertError, Box, Container, XLink} from "../XShared/Components";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {AUTH_ROUTES} from "./index.d";
import * as yup from "yup";
import authService from "./auth.service";

interface ILoginForm {
    email : string;
    password : string;
}

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
});

export const Login = () => {
    const { register, handleSubmit,setError, errors } = useForm<ILoginForm>({
        resolver : yupResolver(schema)
    });
    const [errorFromSubmit,setErrorFromSubmit] = useState<string | null>();

    const onSubmit = async (data : ILoginForm) => {
        setErrorFromSubmit(null);
        const result = await authService.login(data);
        if(result.hasError && !!result.error) {
            if(result.error.httpCode===400 && result.error.errorInfo) {
                const errorInfo = result.error.errorInfo;
                console.log(errorInfo);
                if(errorInfo.email) setError("email", { message: errorInfo.email[0]} );
                if(errorInfo.password) setError("password", { message: errorInfo.password[0]} );
            } else {
                setErrorFromSubmit(result.error.message);
            }
        }
    }

    return (
        <Container>
            <AuthHeader>
                <XLink
                    info={"Not a member?"}
                    title={"Sign up now"}
                    to={AUTH_ROUTES.REGISTER}
                    color={"#7263d4"}
                />
            </AuthHeader>
            <Box height={8}/>
            <PaperAuthForm onSubmit={handleSubmit(onSubmit)}>
                <FormHeading>Login</FormHeading>
                {errorFromSubmit&&<AlertError>{errorFromSubmit}</AlertError>}
                <TextInput
                    label={"Email"}
                    name={"email"}
                    htmlFor={"email"}
                    refFor={register}
                    error={errors.email? errors.email.message : undefined}
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
                    Login
                </PrimaryButton>
                <Box height={3}/>
                <XLink
                    info={"Forgot Password?"}
                    title={"Reset password now"}
                    to={AUTH_ROUTES.FORGOT_PASSWORD}
                    color={"#7263d4"}/>
                <Box height={0.5}/>
                <XLink
                    info={"Email isn't verified?"}
                    title={"Verify email"}
                    to={AUTH_ROUTES.EMAIL_VERIFICATION}
                    color={"#7263d4"}/>
            </PaperAuthForm>
        </Container>
    )
}
