import React, { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Tooltip,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/icons-material";

const DropdownButton = ({
    actions,
    component: ButtonComponent = Button,
    noArrow = false,
    tooltipTitle = "",
    header,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const [mainAction, dropdownActions] = useMemo(() => {
        if (actions.length === 0) {
            throw new Error('Prop "actions" must be an array with at least one element');
        }

        return [actions[0], noArrow ? actions : actions.slice(1)];
    }, [actions]);

    const handleMenuItemClick = (event, index) => {
        if (typeof dropdownActions[index].onClick === "function") {
            dropdownActions[index].onClick(event);
        } else if (dropdownActions[index].onClick) {
            dropdownActions[index].onClick;
        }
        setOpen(false);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const { label: mainLabel, icon: mainIcon, onClick: mainOnClick, ...mainActionProps } = mainAction;

    return (
        <>
            {!noArrow && (
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="actions" {...rest}>
                    <ButtonComponent onClick={mainOnClick} startIcon={mainIcon || null} {...mainActionProps}>
                        {mainLabel}
                    </ButtonComponent>
                    {dropdownActions.length > 0 && (
                        <Button
                            size="small"
                            aria-controls={open ? "actions-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-label="Plus d'options"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    )}
                </ButtonGroup>
            )}
            {noArrow && (
                <Tooltip title={open ? "" : tooltipTitle}>
                    <ButtonComponent
                        ref={anchorRef}
                        size="small"
                        aria-controls={open ? "actions-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-label="Plus d'options"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    />
                </Tooltip>
            )}
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal={noArrow}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                            marginTop: noArrow ? 8 : 0,
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="actions-menu">
                                    {!!header && <MenuItem>{header}</MenuItem>}
                                    {dropdownActions.map((action, index) => {
                                        const { label, icon, onClick, ...actionProps } = action;
                                        return (
                                            <MenuItem
                                                key={label}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                                {...actionProps}
                                            >
                                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                                <ListItemText>{label}</ListItemText>
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

DropdownButton.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func,
            icon: PropTypes.element,
        })
    ).isRequired,
    component: PropTypes.elementType.isRequired,
};

export default DropdownButton;
