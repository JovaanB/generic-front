import React from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

import createEmotionCache from "../styles/createEmotionCache";
import theme from "../config/MUITheme";

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => (
    <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    </CacheProvider>
);

export default MyApp;
