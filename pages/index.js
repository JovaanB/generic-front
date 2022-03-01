import { Button, Typography } from "@mui/material";
import { useState } from "react";
import CustomDialog from "../components/CustomDialog";
import Layout from "../components/Layout";

const Home = () => {
    const [open, setOpen] = useState(false);

    return (
        <Layout title="Sportintech">
            <CustomDialog open={open} title="Mon super titre" handleClose={() => setOpen(false)}>
                Hello, I&apos;m content
            </CustomDialog>
            <div>
                <Typography variant="h1">SportinTech</Typography>
                <Button onClick={() => setOpen(true)}>Ouvrir la Dialog</Button>
            </div>
        </Layout>
    );
};

export default Home;
