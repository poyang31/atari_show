import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"


function UserDetailModal(props) {
    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const oldPassword = data.get("old-password");
        const newPassword = data.get("new-password");
        console.log({
            oldPassword: oldPassword,
            newPassword: newPassword,
        });
        // 確認舊密碼是否正確
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
            bgColor: "background.paper",
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
                <FormControl
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{display: "flex", alignItems: "center"}}
                >
                    <FormGroup sx={{width: "100%"}}>
                        <TextField
                            id="old-password"
                            name="old-password"
                            label="請輸入舊密碼"
                            type="password"
                            sx={{mb: 2, mt: 2}}
                        />
                        <TextField
                            id="new-password"
                            name="new-password"
                            label="請輸入新密碼"
                            type="password"
                            sx={{mb: 2}}
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
