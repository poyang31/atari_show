import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import LoginIcon from "@mui/icons-material/Login";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import client from "../../client/http";
import {SetMember} from "../../actions";

const theme = createTheme();

const register = (username, password) => client("/register", {method: "POST"}, {username, password});

export default function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [status, setStatus] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus("");
        const data = new FormData(event.currentTarget);
        register(data.get("username"), data.get("password"))
            .then((res) => {
                console.log(res);
                // Store AuthToken
                localStorage.setItem("atari_token", res.authToken);
                // SetStoreMember
                dispatch(SetMember(data.get("username")));
                history.push("./");
            })
            .catch((e) => {
                console.error(e);
                if (e.status === 409) {
                    setStatus("使用者代號已被使用")
                } else if (e.status === 400) {
                    setStatus("請填寫必填欄位")
                } else {
                    setStatus("未知錯誤")
                }
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgColor: "secondary.main"}}>
                        <GroupAddIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        註冊
                    </Typography>
                    <Typography
                        component="p"
                        variant="p"
                        style={{color:"#e00"}}
                        sx={{mt: 1}}
                    >
                        {status}
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 3}}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="使用者代號"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="名"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="姓"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="NickName"
                                    label="暱稱"
                                    name="NickName"
                                    autoComplete="NickName"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Line"
                                    label="Line ID"
                                    name="Line"
                                    autoComplete="Line"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Phone"
                                    label="電話號碼"
                                    name="Phone"
                                    autoComplete="Phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="密碼"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary"/>
                                    }
                                    label="我同意 隱私權政策"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            endIcon={<SendIcon/>}
                        >
                            註冊
                        </Button>
                        <Button
                            component={Link}
                            fullWidth
                            variant="outlined"
                            endIcon={<LoginIcon/>}
                            sx={{ mb: 2}}
                            to="/sign-in"
                        >
                            已經有帳號了嗎? 來登入吧
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
