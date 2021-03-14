import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {AuthRouter} from "../Auth";
import {HomeRouter} from "../Home";

export const MainApp = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path={"/auth"} component={AuthRouter}/>
                    <Route path={"/"} component={HomeRouter}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}