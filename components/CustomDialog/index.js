import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const CustomDialog = ({ maxWidth = "md", fullWidth = false, open, title, handleClose, handleConfirm, children }) => (
    <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
            <Box>{children}</Box>
        </DialogContent>
        <DialogActions>
            <Box display="flex" justifyContent="space-between" width="100%">
                <Button onClick={handleClose}>Fermer</Button>
                <Button onClick={handleConfirm}>Confirmer</Button>
            </Box>
        </DialogActions>
    </Dialog>
);

export default CustomDialog;
