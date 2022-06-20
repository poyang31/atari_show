import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function NavBar() {
    const userData = useSelector((state) => state.User);
    return (
        <Box sx={{flexGrow: 1, mb: "32px"}}>
            <AppBar position="fixed">
                <Toolbar>
                    <Box sx={{flexGrow: 1, textDecoration: "none"}} color="inherit" component={Link} to="/">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            {/* <Link><HomeIcon/></Link> */}
                            <HomeIcon sx={{mr: 1}} />
                            <Typography variant="h6" component="span">
                                我愛房東網
                            </Typography>
                        </IconButton>
                    </Box>
                    <Button color="inherit" component={Link} to="/">首頁</Button>
                    <Button color="inherit" component={Link} to="/rent-page">租房資料</Button>
                    <Button color="inherit" component={Link} to="/add-rent-page">刊登房屋</Button>
                    {
                        !userData.username ? (
                            <Button color="inherit" component={Link} to="/sign-in">登入</Button>
                        ) : (
                            <IconButton component={Link} to="/user-detail">
                                <Avatar alt={userData.username} src="../img/female.png"/>
                            </IconButton>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
