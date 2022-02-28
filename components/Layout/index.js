import React, { useEffect, useState } from "react";
import Head from "next/head";
import clsx from "clsx";

import SideMenu from "./SideMenu";
import { lightBlack, sideMenuDrawerWidth, topBarHeight } from "../../config/constants";
import TopBar from "./TopBar";
import { Box, IconButton, NoSsr, useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    hide: {
        display: "none",
    },
    iconButton: {
        position: "fixed",
        color: lightBlack,
        top: 8,
        left: 100,
        zIndex: 99999,
    },
    children: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
    },
    whiteBackground: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F9FD",
        userSelect: "none",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        position: "absolute",
        left: 0,
        top: 0,
        paddingTop: topBarHeight,
        paddingBottom: 32,
        right: 0,
        marginLeft: ({ open }) => (open ? sideMenuDrawerWidth : 0),
    },
}));

const Layout = ({ monoColorBackground, hideMenu, title, children }) => {
    const [open, setOpen] = useState(true);
    const isMobile = useMediaQuery("(max-width:900px)");
    const classes = useStyles({ open });

    useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    return (
        <Box display="flex" flexDirection="row" justifyContent="start">
            <TopBar />
            <div className={classes.whiteBackground}>
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
                </Head>

                <NoSsr>
                    <div className={classes.iconButton}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={() => setOpen(true)}
                            className={clsx(open && classes.hide)}
                        >
                            <Menu />
                        </IconButton>
                    </div>

                    <div className={classes.children}>{children}</div>
                </NoSsr>

                {!hideMenu && (
                    <SideMenu onClose={() => setOpen(false)} open={open} hideDrawerButton={monoColorBackground} />
                )}
            </div>
        </Box>
    );
};

export default Layout;
