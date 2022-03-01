import React from "react";
import { Divider, Drawer, IconButton, Typography } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { makeStyles, useTheme } from "@mui/styles";

import { topItems } from "../../../config/sidemenu";
import { lightBlack, sideMenuDrawerWidth, topBarHeight } from "../../../config/constants";
import { getTitle, shouldDisplayItem } from "./utils";
import SideMenuList from "./SideMenuList";
import SideMenuItem from "./SideMenuItem";

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: sideMenuDrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: sideMenuDrawerWidth,
        zIndex: 0,
        marginTop: topBarHeight,
        borderColor: "#fff",
    },
    drawerHeader: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4, 2),
    },
    closeIcon: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    logo: {
        objectFit: "fill",
        height: 80,
        width: 80,
        borderRadius: "6px",
        border: "1px solid",
        borderColor: (props) => props.customColor,
    },
    welcome: {
        color: lightBlack,
        fontSize: 16,
        lineHeight: "19px",
        marginTop: theme.spacing(2),
    },
    divider: {
        backgroundColor: "#F0F0FA",
    },
    topList: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        marginBottom: topBarHeight + theme.spacing(2),
    },
}));

const SideMenu = ({ hideDrawerButton = false, onClose, open }) => {
    const classes = useStyles();
    const theme = useTheme();

    const logo = "https://via.placeholder.com/110";

    const itemProps = {
        logout: () => {
            localStorage.clear();
        },
    };

    return (
        <Drawer
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <div className={classes.drawerHeader}>
                {!hideDrawerButton && (
                    <IconButton onClick={onClose} className={classes.closeIcon}>
                        {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                )}
                <img src={logo} height={71} width={61} className={classes.logo} alt="logo du club" />

                <Typography className={classes.welcome}>Bienvenue</Typography>
            </div>

            <Divider className={classes.divider} />

            <SideMenuList className={classes.topList}>
                {topItems
                    .filter((item) => shouldDisplayItem(item, itemProps))
                    .map((item) => (
                        <SideMenuItem key={getTitle(item, itemProps)} item={item} itemProps={itemProps} />
                    ))}
            </SideMenuList>
        </Drawer>
    );
};

export default SideMenu;
