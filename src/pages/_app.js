import App from "next/app";
import React from "react";
import {ThemeProvider} from "styled-components";
import AppWrapper from "../components/AppWrapper";
import {LoggedIn} from "../hooks/useLoggedIn";

const theme = {
    colors: {
        primary: "#292929",
    },
    fonts: {
        primary: "Jost,sans-serif",
    },
};

export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props;

        return (
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <LoggedIn render={
                        ([loggedIn, loggedInDispatch]) => (
                            <Component loggedIn={loggedIn} loggedInDispatch={loggedInDispatch} {...pageProps} />
                        )
                    }/>
                </AppWrapper>
            </ThemeProvider>
        );
    }
}
