import * as React from "react";
import {Link} from "react-router-dom"
import "./Footer.css";
import {Box, Container, Grid} from "@mui/material";

export default function Footer() {
    return (
        <Box px={{xs: 3, sm: 10}} pt={{xs: 5, sm: 10}} bgcolor="#000" color="white">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>客服中心</Box>
                        <Box component={Link} to="/" className="link">幫助</Box><br/>
                        <Box component={Link} to="/" className="link">隱私</Box><br/>
                        <Box component={Link} to="/" className="link">聯繫</Box><br/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>使用者中心</Box>
                        <Box component={Link} to="/" className="link">登入</Box><br/>
                        <Box component={Link} to="/" className="link">註冊</Box><br/>
                        <Box component={Link} to="/" className="link">聯繫</Box><br/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>關注我們</Box>
                        <Box component={Link} to="/" className="link">幫助</Box><br/>
                        <Box component={Link} to="/" className="link">隱私</Box><br/>
                        <Box component={Link} to="/" className="link">聯繫</Box><br/>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{xs: 5, sm: 10}} pb={5}></Box>
            </Container>
        </Box>
    )
}
