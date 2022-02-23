import { ThemeProvider } from "@mui/material/styles";

import MUITheme from "../common/config/MUITheme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={MUITheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
