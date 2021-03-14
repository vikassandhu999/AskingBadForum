import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import "./auth.styles.scss";
import {FormAlert} from "../../../client/src/shared/components/inputs/FormAlert";
import {TextInput} from "../../../client/src/shared/components/inputs/TextInput";
import {CTAButton} from "../../../client/src/shared/components/button";
import authService, {LoginProps, EmailVerificationProps} from "./auth.service";
import * as Yup from "yup";
import { AUTH_ROUTES } from "./index";

const sleep = (ms: number) => new Promise((resolve => setTimeout(resolve, ms)));

const validationSchema = Yup.object({
    email: Yup.string().email().required(),
});

const initialValues = {
    email: ""
}

export const EmailVerificationComponent = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const onSubmit = async (values: EmailVerificationProps) => {
        setErrorMessage(null);
        const result = await authService.emailVerification(values);
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

    if(success) return EmailVerificationSuccessView(formik.values.email);

    return EmailVerificationView(formik,errorMessage);
}

const EmailVerificationSuccessView = (email: string) => {
    return (
        <div className="paper-card">
            <div className="message">
                <h3>One more step</h3>
                <p>
                    An Verification email has been sent to {email}
                </p>
            </div>
        </div>
    )
}

const EmailVerificationView = (formik : any,errorMessage : string | null) => {
    return (
        <form onSubmit={formik.handleSubmit} className="paper-card">
            <div className="row">
                <h2 className={"col-12"}>Verify Email</h2>
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
                <div className="col-12 mt-3 d-flex justify-content-end">
                    <CTAButton title={"Send Verification"} disabled={(formik.isSubmitting)}/>
                </div>
                <div className={"col-12 form-option"}>
                    <h4>Or</h4>
                    <p>Don't have an account?<Link to={AUTH_ROUTES.REGISTER}>Register</Link></p>
                    <p>Already have an account?<Link to={AUTH_ROUTES.LOGIN}>Login</Link></p>
                </div>
            </div>
        </form>
    );
}