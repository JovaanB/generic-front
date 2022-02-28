import React, { useState } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { Collapse, Link as MuiLink, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import { grey } from "../../../config/constants";
import { getPath, getTitle, isSelected, shouldDisplayItem } from "./utils";
import SideMenuList from "./SideMenuList";
import NEW from "../../New";

const itemPropType = PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    additionalProps: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    color: PropTypes.string,
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    IconComponent: PropTypes.elementType,
    items: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
    openOnExact: PropTypes.bool,
});

function Wrapper({ item, itemProps, children }) {
    const path = getPath(item, itemProps);
    if (path) {
        return (
            <NextLink href={path} passHref>
                {children}
            </NextLink>
        );
    }

    return children;
}

Wrapper.propTypes = {
    item: itemPropType.isRequired,
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    itemProps: PropTypes.object.isRequired,
};

const useStyles = makeStyles({
    text: {
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "22px",
        letterSpacing: "0.1px",
    },
    icon: {
        marginRight: -16,
        color: ({ altColor }) => altColor,
    },
    selected: {
        "&.Mui-selected": {
            "& $icon": {
                color: ({ color }) => color,
            },
            color: ({ color }) => `${color} !important`,
            borderRight: ({ color }) => `4px solid ${color}`,
            fontWeight: 600,
        },
    },
    root: {
        color: grey,
        "&:hover": {
            "& $icon": {
                color: ({ color }) => color,
            },
            backgroundColor: "rgba(86, 99, 213, 0.07)",
            fontWeight: 600,
        },
    },
});

function SideMenuItemInner({ item, itemProps, selected, onClick }) {
    const classes = useStyles({ color: item.color, altColor: item.altColor });

    const additionalProps = item.additionalProps || {};
    const component = item.path ? MuiLink : "div";

    return (
        <Wrapper item={item} itemProps={itemProps}>
            <ListItem
                button
                selected={selected}
                onClick={onClick}
                classes={{
                    selected: classes.selected,
                    root: classes.root,
                }}
                component={component}
                {...additionalProps}
            >
                {item.IconComponent && (
                    <ListItemIcon className={classes.icon}>
                        <item.IconComponent />
                    </ListItemIcon>
                )}
                <ListItemText classes={{ primary: classes.text }}>{getTitle(item, itemProps)}</ListItemText>
                {item.isNew && <NEW tooltipMessage={item.tooltipMessage} />}
                {item.items?.length > 0 && item.openOnExact !== false && <ArrowDropDown />}
            </ListItem>
        </Wrapper>
    );
}

SideMenuItemInner.propTypes = {
    item: itemPropType.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    itemProps: PropTypes.object.isRequired,
};
SideMenuItemInner.defaultProps = {
    selected: false,
    onClick: () => {},
};

function SideMenuItem({ item, itemProps, onClick }) {
    const router = useRouter();
    const [selected, selectedSubItemIndex] = isSelected(item, router);
    const openOnExact = item.openOnExact !== false;
    const [open, setOpen] = useState(
        ((openOnExact || selectedSubItemIndex >= 0) && selected) || item.openOnPath?.includes(router.pathname)
    );

    function handleParentClick(event) {
        // If SideMenuItem receives a direct `onClick` prop, call it in priority
        if (typeof onClick === "function") {
            onClick(event);
            return;
        }
        // If the item has a `onClick` property, call it with `itemProps` as context
        if (typeof item.onClick === "function") {
            item.onClick(event, itemProps);
            return;
        }
        // Else manage the open state when there are nested items
        if (item.items && !item.path) {
            setOpen((prevOpen) => !prevOpen);
        }
    }

    return (
        <>
            <SideMenuItemInner
                item={item}
                itemProps={itemProps}
                selected={selected && (!open || !item.items?.length)}
                onClick={handleParentClick}
            />

            {item.items && (
                <Collapse in={open}>
                    <SideMenuList nested>
                        {item.items
                            .filter((subItem) => shouldDisplayItem(subItem, itemProps))
                            .map((subItem, index) => (
                                <SideMenuItemInner
                                    key={getTitle(subItem, itemProps)}
                                    item={subItem}
                                    selected={selectedSubItemIndex === index}
                                    itemProps={itemProps}
                                    onClick={subItem.onClick}
                                />
                            ))}
                    </SideMenuList>
                </Collapse>
            )}
        </>
    );
}

SideMenuItem.propTypes = {
    item: itemPropType.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    itemProps: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

SideMenuItem.defaultProps = {
    onClick: null,
};

export default SideMenuItem;
