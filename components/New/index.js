import React from "react";
import { Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    NEW: {
        display: "inline",
        fontWeight: "bold",
        color: "#9933ff",
        fontSize: 14,
        backgroundColor: "#f2e6ff",
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 4,
        width: 40,
        textAlign: "center",
    },
    tooltip: {
        fontSize: 14,
    },
}));

const NEW = ({ tooltipMessage = "" }) => {
    const classes = useStyles();

    return (
        <Tooltip title={<span className={classes.tooltip}>{tooltipMessage}</span>} placement="top">
            <Typography className={classes.NEW}>NEW</Typography>
        </Tooltip>
    );
};

export default NEW;
