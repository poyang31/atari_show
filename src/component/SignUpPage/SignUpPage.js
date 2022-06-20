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
import {SetUser} from "../../action";

const theme = createTheme();

const register = (
    username,
    password,
    lastName,
    firstName,
    nickname,
    lineId,
    phone
) => client("/register", {method: "POST"}, {
    username,
    password,
    lastName,
    firstName,
    nickname,
    lineId,
    phone
});

export default function SignUpPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [status, setStatus] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus("");
        const data = new FormData(event.currentTarget);
        if (data.get("password") !== data.get("passwordConfirm")) {
            setStatus("密碼互不相符");
            return;
        }
        if (data.get("isAllowPrivacy") !== "yes") {
            setStatus("未同意隱私權政策");
            return;
        }
        register(
            data.get("username"),
            data.get("password"),
            data.get("lastName"),
            data.get("firstName"),
            data.get("nickname"),
            data.get("lineId"),
            data.get("phone")
        )
            .then((res) => {
                // Store AuthToken
                localStorage.setItem("atari_token", res.authToken);
                // SetUser
                dispatch(SetUser(res.user));
                history.push("./");
            })
            .catch((e) => {
                console.error(e);
                if (e.status === 409) {
                    setStatus("使用者代號已被使用");
                } else if (e.status === 400) {
                    setStatus("請填寫必填欄位");
                } else {
                    setStatus("未知錯誤");
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
                        color="#e00"
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
                                    id="username"
                                    name="username"
                                    label="使用者代號"
                                    autoComplete="username"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    label="名"
                                    autoComplete="given-name"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    label="姓"
                                    autoComplete="family-name"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="nickname"
                                    name="nickname"
                                    label="暱稱"
                                    autoComplete="nickname"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lineId"
                                    name="lineId"
                                    label="LINE ID"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    label="電話號碼"
                                    autoComplete="phone"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="密碼"
                                    type="password"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    label="再次確認密碼"
                                    type="password"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="isAllowPrivacy"
                                            color="primary"
                                            value="yes"
                                        />
                                    }
                                    label="我同意隱私權政策"
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
