import React, {useState} from "react";
import {Redirect, Link} from "react-router-dom";
import {useFormik} from "formik";
import "./auth.styles.scss";
import {FormAlert} from "../../../client/src/shared/components/inputs/FormAlert";
import {TextInput} from "../../../client/src/shared/components/inputs/TextInput";
import {CTAButton} from "../../../client/src/shared/components/button";
import authService, {LoginProps} from "./auth.service";
import * as Yup from "yup";
import { AUTH_ROUTES } from "./index";


const sleep = (ms: number) => new Promise((resolve => setTimeout(resolve, ms)));


const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().max(30).min(6).required(),
});

const initialValues = {
    email: "",
    password: ""
}

export const LoginComponent = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const onSubmit = async (values: LoginProps) => {
        setErrorMessage(null);
        const result = await authService.login(values);
        if (result.hasErrors) {
            setErrorMessage(result.error);
            setSuccess(true);
        } else {
            window.location.reload();
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });

    if(success) return <Redirect to={"/"}/>

    return LoginFormView(formik,errorMessage);
}


const LoginFormView = (formik : any,errorMessage : string | null) => {
    return (
        <form onSubmit={formik.handleSubmit} className="paper-card">
            <div className="row">
                <h2 className={"col-12"}>Login</h2>
                {errorMessage && (
                    <div className="col-12 mb-2">
                        <FormAlert message={errorMessage}/>
                    </div>)
                }
                <div className="col-12">
                    <TextInput
                        label={"Email"}
                        htmlFor={"email"}
                        name={"email"}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email ? formik.errors.email : undefined}
                    />
                </div>
                <div className="col-12">
                    <TextInput
                        label={"Password"}
                        htmlFor={"password"}
                        name={"password"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password ? formik.errors.password : undefined}
                    />
                </div>
                <div className="col-12 mt-3 d-flex justify-content-end">
                    <CTAButton type={"submit"} title={"Login"} disabled={(formik.isSubmitting)}/>
                </div>
                <div className={"col-12 form-option"}>
                    <h4>Or</h4>
                    <p>Don't have an account?<Link to={AUTH_ROUTES.REGISTER}>Register</Link></p>
                    <p>Verify your email! <Link to={AUTH_ROUTES.EMAIL_VERIFICATION}>Verify Email</Link></p>
                </div>
            </div>
        </form>
    );
}