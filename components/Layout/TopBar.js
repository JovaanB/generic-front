import React from "react";
import { useRouter } from "next/router";
import { AppBar, Box, Toolbar, Avatar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ContactSupport, ExitToAppOutlined, Mail, Person } from "@mui/icons-material";
import Image from "../Image";
import DropdownButton from "../DropdownButton";
import { lightBlack, secondaryColor } from "../../config/constants";

const useStyles = makeStyles(() => ({
    topBar: {
        "& > .MuiToolbar-root": {
            display: "flex",
            justifyContent: "space-between",
        },
        background: `linear-gradient(90.18deg, #F7F7FD 10.23%, #FFFFFF 36.6%) !important`,
    },
    userName: {
        fontFamily: "Roboto",
        color: "#F7F7FB",
        fontSize: "16px",
        margin: 0,
    },
    userEmail: {
        fontFamily: "Roboto",
        color: "#A1A2B6",
        fontSize: "14px",
        margin: 0,
    },
    cursorPointer: {
        cursor: "pointer",
        color: "#F0F0FA",
    },
    avatar: {
        cursor: "pointer",
        color: "#F0F0FA",
        backgroundColor: secondaryColor,
    },
    helpComponent: {
        fontSize: 16,
        color: lightBlack,
    },
}));

function TopBar() {
    const router = useRouter();
    const classes = useStyles();
    const logo = "https://via.placeholder.com/110";
    const initials = "JD";

    const helpComponent = React.forwardRef(({ ...rest }, ref) => (
        <Button ref={ref} {...rest} className={classes.helpComponent} endIcon={<ContactSupport />}>
            Besoin d&apos;aide
        </Button>
    ));
    const avatarComponent = React.forwardRef(({ ...rest }, ref) => (
        <Avatar ref={ref} {...rest} className={classes.avatar}>
            {initials}
        </Avatar>
    ));
    const logout = () => {
        localStorage.clear();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar classes={{ root: classes.topBar }}>
                <Toolbar>
                    <div className={classes.cursorPointer}>
                        <Image src={logo} height={32} />
                    </div>
                    <Box display="flex" alignItems="center" gridGap="30px">
                        <DropdownButton
                            actions={[
                                {
                                    label: "Envoyer un mail",
                                    onClick: () => router.push("/"),
                                    icon: <Mail />,
                                },
                            ]}
                            component={helpComponent}
                            noArrow
                        />
                        <DropdownButton
                            actions={[
                                {
                                    label: "Modifier mon compte",
                                    onClick: () => router.push("/"),
                                    icon: <Person />,
                                },
                                { label: "Me déconnecter", onClick: () => logout(), icon: <ExitToAppOutlined /> },
                            ]}
                            header="john.doe@gmail.com"
                            component={avatarComponent}
                            noArrow
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;
