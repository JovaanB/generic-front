import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { List } from "@mui/material";

const SideMenuList = withStyles((theme) => ({
    root: {
        paddingTop: (props) => (props.nested ? 0 : 2),
        paddingBottom: (props) => (props.nested ? 0 : 2),

        "& .MuiList-root .MuiListItem-root": {
            paddingLeft: theme.spacing(3),
        },
    },
    // eslint-disable-next-line no-unused-vars
}))(({ nested, ...rest }) => <List component="nav" {...rest} />);

SideMenuList.propTypes = {
    nested: PropTypes.bool,
};

SideMenuList.defaultProps = {
    nested: false,
};

export default SideMenuList;
