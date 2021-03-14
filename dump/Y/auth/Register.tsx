import React, {useState} from "react";
import {useFormik} from "formik";
import "./auth.styles.scss";
import {FormAlert} from "../../../client/src/shared/components/inputs/FormAlert";
import {TextInput} from "../../../client/src/shared/components/inputs/TextInput";
import {CTAButton} from "../../../client/src/shared/components/button";
import authService, {RegisterProps} from "./auth.service";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import {AUTH_ROUTES} from "./index";

const sleep = (ms: number) => new Promise((resolve => setTimeout(resolve, ms)));

const validationSchema = Yup.object({
    fullName: Yup.string().min(3).max(30).required(),
    userName: Yup.string().min(3).max(30).required(),
    email: Yup.string().email().required(),
    password: Yup.string().max(30).min(6).required(),
});

const initialValues = {
    fullName: "",
    userName: "",
    email: "",
    password: ""
}

export const RegisterComponent = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const onSubmit = async (values: RegisterProps) => {
        setErrorMessage(null);
        const result = await authService.regiser(values);
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


    if (success) return RegisterSuccessView(formik.values.email);

    return RegisterFormView(formik, errorMessage);
}


const RegisterSuccessView = (email: string) => {
    return (
        <div className="paper-card">
            <div className="message">
                <h3>One step left</h3>
                <p>
                    An Verification email has been sent to {email}
                </p>
            </div>
        </div>
    )
}

const RegisterFormView = (formik: any, errorMessage: string | null) => {
    return (
        <form onSubmit={formik.handleSubmit} className="paper-card">
            <div className="row">
                <h2 className={"col-12"}>Register</h2>
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
                        label={"Full Name"}
                        htmlFor={"fullName"}
                        name={"fullName"}
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        error={formik.touched.fullName ? formik.errors.fullName : undefined}
                    />
                </div>
                <div className="col-12">
                    <TextInput
                        label={"Username"}
                        htmlFor={"userName"}
                        name={"userName"}
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        error={formik.touched.userName ? formik.errors.userName : undefined}
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
                    <CTAButton type={"submit"} title={"Register"} disabled={(formik.isSubmitting)}/>
                </div>
                <div className={"col-12 form-option"}>
                    <h4>Or</h4>
                    <p>Already have an account?<Link to={AUTH_ROUTES.LOGIN}>Login</Link></p>
                    <p>Verify your email!<Link to={AUTH_ROUTES.EMAIL_VERIFICATION}>Verify Email</Link></p>
                </div>
            </div>
        </form>
    );
}