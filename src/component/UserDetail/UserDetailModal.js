import React, {useState} from "react";

import {
    Box,
    Typography,
    FormControl,
    FormGroup,
    TextField,
    Button,
    Divider,
    Stack
} from "@mui/material";

function UserDetailModal(props) {
    const [status, setStatus] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (data.get("password") !== data.get("passwordConfirm")) {
            setStatus("密碼互不相符");
            return;
        }
        console.log({
            newPassword: data.get("password"),
        });
        // 確認密碼是否正確
        // 修改密碼
        props.setModalStatus(false);
    }

    return (
        <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "#fff",
            border: "1px solid #000",
            boxShadow: 5,
            borderRadius: 2
        }}>
            <img
                src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png"
                style={{opacity: 0.5, cursor: "pointer", float: "right", width: "35px", padding: 15}}
                onClick={() => props.setModalStatus(false)}
                aria-hidden="true"
                alt="user"
            />
            <Box sx={{p: 5}}>
                <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                >
                    更改使用者密碼
                </Typography>
                <Divider sx={{m: 1}}/>
                <Typography
                    component="p"
                    variant="p"
                    color="#e00"
                    sx={{my: 1}}
                >
                    {status}
                </Typography>
                <FormControl
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{display: "flex", alignItems: "center"}}
                >
                    <FormGroup sx={{width: "100%"}}>
                        <TextField
                            id="password"
                            name="password"
                            label="請輸入新密碼"
                            type="password"
                            sx={{my: 2}}
                        />
                        <TextField
                            id="passwordConfirm"
                            name="passwordConfirm"
                            label="再次確認密碼"
                            type="password"
                            sx={{my: 2}}
                        />
                    </FormGroup>
                    <Stack direction={"row"} spacing={3}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            確定修改密碼
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => props.setModalStatus(false)}
                        >
                            取消
                        </Button>
                    </Stack>
                </FormControl>
            </Box>
        </Box>
    );
}

export default UserDetailModal;
