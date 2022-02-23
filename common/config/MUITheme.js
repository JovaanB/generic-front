import { createTheme } from "@mui/material/styles";
import { primaryColor } from "./constants";

const MUITheme = createTheme({
    palette: {
        primary: { main: primaryColor },
    },
});

export default MUITheme;
