import {
    AppBar,
    Toolbar,
    Typography
} from "@mui/material";
import React from "react";

const Appbar = () => {
    return <AppBar color="secondary" position="relative">
        <Toolbar>
            <Typography variant="h6">CF ARENA</Typography>
        </Toolbar>
    </AppBar>
};

export default Appbar;