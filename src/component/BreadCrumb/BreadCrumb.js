import React, {useEffect} from "react"
import {Box, Breadcrumbs, Typography} from "@mui/material";
import {Link, withRouter} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function BreadCrumb(props) {
    const setBreadcrumbs = () => {
        const HistoryList = props.match.path;
        return HistoryList.split("/");
    }

    useEffect(() => {
        const BreadCrumbList = setBreadcrumbs();
        console.log(BreadCrumbList);
    }, []);

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/">
                    <HomeIcon/>
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
        </Box>
    );
}

export default withRouter(BreadCrumb);
