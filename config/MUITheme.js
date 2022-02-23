import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { primaryColor } from "./constants";

let MUITheme = createTheme({
    palette: {
        primary: { main: primaryColor },
    },
});

MUITheme = responsiveFontSizes(MUITheme);

export default MUITheme;
