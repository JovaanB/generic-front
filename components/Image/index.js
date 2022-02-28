import React from "react";
import { useAmp } from "next/amp";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    img: {
        maxHeight: 200,
        objectFit: "cover",
    },
});

export const Image = ({ src, width = "auto", height = "300" }) => {
    const classes = useStyles();
    const isAmp = useAmp();

    return isAmp ? (
        <amp-img src={src} width={width} height={height} className={classes.img} />
    ) : (
        <img src={src} width={width} height={height} className={classes.img} />
    );
};
