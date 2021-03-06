import React, { useState } from "react";
import { TextInput } from "../../shared/components/inputs/TextInput";
import { TextAreaInput } from "../../shared/components/inputs/TextAreaInput";
import { CTAButton } from "../../shared/components/button";
import postService, { CreatePostProps } from "./post.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router";

const validationSchema = Yup.object({
    title: Yup.string().max(30).min(6).required(),
    body: Yup.string().max(30).min(6).required(),
});

const initialValues = {
    title : "",
    body : ""
}

export const CreatePostComponent = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const onSubmit = async (values: CreatePostProps) => {
        setErrorMessage(null);
        const result = await postService.create(values);
        if (result.hasErrors) {
            // @ts-ignore
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

    return CreatePostView(formik,errorMessage);
}

const CreatePostView = (formik : any,errorMessage : string | null) => {
    return (
        <div className="row">
            <div className="col-12 box-80"></div>
            <div className="col-lg-8 col-md-6 m-auto">
                <form onSubmit={formik.handleSubmit} className="paper-card">
                    <TextInput
                        label={"Post Title"}
                        htmlFor={"title"}
                        name={"title"}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <TextAreaInput
                        label={"Post Description"}
                        htmlFor={"body"}
                        name={"body"}
                        onChange={formik.handleChange}
                        value={formik.values.body}
                    />
                    <div className="col-12 mt-3 d-flex justify-content-end">
                        <CTAButton type={"submit"} title={"Create Post"} disabled={(formik.isSubmitting)}/>
                    </div>
                </form>
            </div>
        </div>
    );
}