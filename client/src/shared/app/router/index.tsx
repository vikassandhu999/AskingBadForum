import React from "react";
import {BrowserRouter} from "react-router-dom";
import { Switch, Router, Route } from "react-router";
import { HomePage } from "../../../pages/home";
import { HeaderComponent } from "../../components/header";
import { Auth, AUTH_ROUTES } from "../../../pages/auth";
import { POST_ROUTES, PostRouteComponent } from "../../../pages/post";


const App = () => {
    return (
        <div className = "app">
            <BrowserRouter>
                <Switch>
                    <Route path={AUTH_ROUTES.BASE}>
                        <HeaderComponent/>
                        <Auth/>
                    </Route>
                    <Route path={POST_ROUTES.BASE}>
                        <HeaderComponent/>
                        <PostRouteComponent/>
                    </Route>
                    <Route exact path={"/"}>
                        <HeaderComponent/>
                        <HomePage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;