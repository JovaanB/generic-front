import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { primaryColor } from "./constants";

/* eslint-disable */
let MUITheme = createTheme({
    palette: {
        primary: { main: primaryColor },
    },
});

MUITheme = responsiveFontSizes(MUITheme);

export default MUITheme;
