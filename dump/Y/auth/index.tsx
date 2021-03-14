import React, { useState } from "react";
import {Route} from "react-router";
import {Redirect} from "react-router-dom";
import "./auth.styles.scss";
import { RegisterComponent } from "./Register";
import { LoginComponent } from "./Login";
import { EmailVerificationComponent } from "./EmailVerification";

export enum AUTH_ROUTES {
    BASE="/auth",
    LOGIN="/auth/login",
    REGISTER="/auth/register",
    EMAIL_VERIFICATION="/auth/email-verification"
}

export const Auth = () => {
    return (
        <main className = "container">
            <div className="row">
                <div className="col-12 box-80"></div>
                <div className="col-lg-5 m-auto">
                    <Route exact path={AUTH_ROUTES.BASE} render = {() => <Redirect to={AUTH_ROUTES.LOGIN}/>}/>
                    <Route exact path={AUTH_ROUTES.LOGIN} component = {LoginComponent}/>
                    <Route exact path={AUTH_ROUTES.REGISTER} component = {RegisterComponent}/>
                    <Route exact path={AUTH_ROUTES.EMAIL_VERIFICATION} component = {EmailVerificationComponent}/>
                </div>
            </div>
        </main>
    )
}