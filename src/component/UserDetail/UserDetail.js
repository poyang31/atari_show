import React, {useState} from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton"
import FormControl from "@mui/material/FormControl"
import Divider from "@mui/material/Divider"

import FormGroup from "@mui/material/FormGroup"

import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography";

import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ResetUser} from "../../action";
import UserDetailModal from "./UserDetailModal";
import client from "../../client/http";

const updateUser = (
    lastName,
    firstName,
    nickname,
    lineId,
    phone
) => client("/profile", {method: "PUT"}, {
    lastName,
    firstName,
    nickname,
    lineId,
    phone
});

function UserDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.User);

    const [imgSrc, setImgSrc] = useState("");
    const [ModalStatus, setModalStatus] = useState(false);

    if (!userData.username) {
        history.push("./");
    }

    // 處理登出
    const handleLogout = () => {
        localStorage.removeItem("atari_token");
        dispatch(ResetUser());
        history.push("./");
    };

    // 更改使用者頭像
    const handleFile = e => {
        const imgFile = [...e.target.files];
        if (imgFile.length < 1) return;
        const newImageObjects = imgFile.map(
            (image) => URL.createObjectURL(image)
        );
        if (newImageObjects.length) {
            setImgSrc(newImageObjects[0]);
        }
    };

    const triggerFile = () => {
        document.getElementById("fileButton").click();
    };

    //處理確認修改事項
    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        //送出後端
        updateUser(
            data.get("lastName"),
            data.get("firstName"),
            data.get("nickname"),
            data.get("lineId"),
            data.get("phone")
        )
            .then(() => {
                // Store AuthToken
                localStorage.removeItem("atari_token");
                // SetUser
                dispatch(ResetUser());
                history.push("./");
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <Box sx={{display: "flex", justifyContent: "center", position: "sticky", top: 150}}>
            <Box sx={{
                flexDirection: "column",
                mt: 5,
                p: 5,
                border: 1,
                borderRadius: 5,
                borderColor: "#589dfc",
                boxShadow: 5
            }}>
                <Stack sx={{display: "flex", justifyContent: "center"}} direction={"row"}
                    spacing={0.1}> {/* 切邊 左邊顯示可更改內容 右邊顯示頭像 */}
                    <Box sx={{width: "35rem"}}> {/* 左邊區塊 顯示可更改內容 */}
                        <FormControl component="form" onSubmit={handleSubmit}>
                            <Typography
                                variant="h5" color="initial"
                                sx={{textAlign: "center", mb: 2}}
                            >
                                修改使用者資訊
                            </Typography>
                            <Divider sx={{m: 1}}/>
                            <FormGroup>
                                <Stack direction={"column"} spacing={2}>
                                    <TextField
                                        id="username"
                                        name="username"
                                        label="使用者代號"
                                        defaultValue={userData.username}
                                        disabled
                                    />
                                    <Stack direction={"row"} spacing={2}>
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            defaultValue={userData.lastName}
                                            label="真實姓氏"
                                        />
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            defaultValue={userData.firstName}
                                            label="真實名字"
                                        />
                                    </Stack>
                                    <Stack direction={"row"} spacing={2}>
                                        <TextField
                                            id="nickname"
                                            name="nickname"
                                            defaultValue={userData.nickname}
                                            label="暱稱"
                                        />
                                        <TextField
                                            id="lineId"
                                            name="lineId"
                                            defaultValue={userData.lineId}
                                            label="LINE ID"
                                        />
                                    </Stack>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        defaultValue={userData.phone}
                                        label="電話號碼"
                                    />
                                </Stack>
                            </FormGroup>
                            <Button style={{marginTop: "10px"}} variant="contained" color="primary" type="submit">
                                確定修改
                            </Button>
                        </FormControl>
                    </Box>
                    <Stack>{/* 右邊區塊 顯示頭像 */}
                        <input id="fileButton" type="file" hidden onChange={handleFile}/>
                        <Box>
                            <IconButton onClick={triggerFile}> {/* 點擊時觸發上面的input File */}
                                <Avatar
                                    alt={userData.username}
                                    src={imgSrc ? imgSrc[0] : ""}
                                    sx={{width: "20vh", height: "20vh"}}
                                />
                            </IconButton>
                            <Box sx={{textAlign: "center"}}>
                                <Typography variant="p" color="#333">
                                    點擊上方更改頭像
                                </Typography>
                            </Box>
                        </Box>
                        <Stack> {/* 下方登出列 */}
                            <Button
                                sx={{mt: 2}}
                                variant="outlined"
                                onClick={() => setModalStatus(true)}
                            >
                                更改密碼
                            </Button>
                            <Button
                                sx={{mt: 2}}
                                variant="contained"
                                color="warning"
                                onClick={handleLogout}
                            >
                                登出
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
            {/* ==Modal== */}

            <Modal
                open={ModalStatus}
                onClose={() => setModalStatus(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <UserDetailModal setModalStatus={setModalStatus}/>
                </div>
            </Modal>

            {/* ==Modal== */}
        </Box>

    );
}

export default UserDetail;
