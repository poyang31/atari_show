import * as React from "react";

import {Link, useHistory} from "react-router-dom"
import {useDispatch} from "react-redux";

import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import client from "../../client/http";
import {SetMember} from "../../actions";

const theme = createTheme();

const login = (username, password) => client("/login", {method: "POST"}, {username, password});

export default function SignIn() {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login(data.get("username"), data.get("password"))
            .then((res) => {
                console.log(res);
                // SetStoreMember
                if (res.body === 1) {
                    dispatch(SetMember(data.get("email")));
                    history.push("./");
                }
            })
            .catch((e) => {
                console.log(e)
            })
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
                        <AccountCircleIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        登入
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="使用者暱稱"
                            name="username"
                            autoComplete="username"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="密碼"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="記得我"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            endIcon={<SendIcon/>}
                            sx={{mt: 3, mb: 2}}
                        >
                            登入
                        </Button>
                        <Button
                            component={Link}
                            fullWidth
                            variant="outlined"
                            endIcon={<PersonAddAltIcon/>}
                            sx={{ mb: 2}}
                            to="/sign-up"
                        >
                            還沒有帳號嗎? 註冊
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
