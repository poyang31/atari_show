import React, {useEffect} from "react"
import {Link, withRouter} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import {
    Breadcrumbs,
    Typography
} from "@mui/material";

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
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">
                    <HomeIcon sx={{color: "#111"}} />
                </Link>
                <Typography color="text.primary">房屋照片</Typography>
            </Breadcrumbs>
        </>
    );
}

export default withRouter(BreadCrumb);
