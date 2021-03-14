import React from "react";
import {Redirect, Route} from "react-router";
import {SendEmailVerification} from "./SendEmailVerificaiton";
import {Login} from "./Login";
import {Register} from "./Register";
import {AUTH_ROUTES} from "./index.d";
import {Box} from "../XShared/Components";
import {ForgotPassword} from "./ForgotPassword";
import {AuthLayout, AuthLayoutContent, AuthLayoutSidebar} from "./components";

export const AuthRouter = () => {
    return (
        <AuthLayout>
            <AuthLayoutSidebar />
            <AuthLayoutContent>
                <Route exact path={AUTH_ROUTES.BASE} render = {() => <Redirect to={AUTH_ROUTES.LOGIN}/>}/>
                <Route exact path={AUTH_ROUTES.LOGIN} component = {Login}/>
                <Route exact path={AUTH_ROUTES.REGISTER} component = {Register}/>
                <Route exact path={AUTH_ROUTES.FORGOT_PASSWORD} component = {ForgotPassword}/>
                <Route exact path={AUTH_ROUTES.EMAIL_VERIFICATION} component = {SendEmailVerification}/>
            </AuthLayoutContent>
        </AuthLayout>
    )
}