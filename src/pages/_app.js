import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import AppWrapper from "../components/AppWrapper";

const theme = {
    colors: {
        primary: '#0070f3',
    },
    fonts: {
        primary: "Jost,sans-serif"
    }
}

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <Component {...pageProps} />
                </AppWrapper>
            </ThemeProvider>
        )
    }
}
