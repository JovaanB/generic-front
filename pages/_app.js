import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import MUITheme from "../common/config/MUITheme";
import createEmotionCache from "../styles/createEmotionCache";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>SportinTech</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={MUITheme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;
