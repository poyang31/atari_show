import React, {useEffect, useState} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import Button from "@mui/material/Button"

function AddRentPage(props) {
    const {cityData} = props;
    //存放資料
    const [floorStatus, setFloorStatus] = useState(false); //出租樓層
    const [addressCity, setAddressCity] = useState(""); //地址縣市
    const [addressArea, setAddressArea] = useState(""); //地址縣市
    const [Address, setAddress] = useState("") //地址
    const [houseType, setHouseType] = useState(""); //房屋類型
    const [roomType, setRoomType] = useState(""); //房間類型
    const [squareFeet, setSquareFeet] = useState(); //坪數
    const [rentMoney, setRentMoney] = useState(); //租金金額
    const [deposit, setDeposit] = useState("面議"); //押金
    const [rooms, setRooms] = useState([
        {id: 1, roomName: "總房間", roomNumber: 0},
        {id: 2, roomName: "房間", roomNumber: 0},
        {id: 3, roomName: "衛浴", roomNumber: 0},
        {id: 4, roomName: "大廳", roomNumber: 0},
    ]); //房間數量
    const [ShortestRentTime, setShortestRentTime] = useState(""); //最短租期
    const [SexRequirement, setSexRequirement] = useState("皆可"); //性別要求 租住條件
    const [ableToFire, setAbleToFire] = useState(false); //可否開伙 房屋規定
    const [AblePet, setAblePet] = useState(false); //可否養寵物 房屋規定
    const [ableToGetInDate, setAbleToGetInDate] = useState(""); //可遷入日
    const [Describe, setDescribe] = useState("") //敘述
    const [Title, setTitle] = useState("朝向") //房屋標題
    const [HouseForward, setHouseForward] = useState("") //房屋朝向
    const [images, setImages] = useState([]); //使用者傳入照片
    const [ImgURL, setImgURL] = useState([]); //顯示照片
    const [furnitureArray, setFurnitureArray] = useState([ //提供個人設備
        {id: 1, furniture: "床", status: false},
        {id: 2, furniture: "書桌", status: false},
        {id: 3, furniture: "冰箱", status: false},
        {id: 4, Furniture: "冷氣", status: false},
        {id: 5, furniture: "熱水器", status: false},
        {id: 6, furniture: "電視", status: false},
    ]);
    const [ServiceArray, setServiceArray] = useState([ //提供服務
        {id: 1, Service: "管理室", status: false},
        {id: 2, Service: "回收室", status: false},
        {id: 3, Service: "網路", status: false},
        {id: 4, Service: "第四台", status: false},
        {id: 5, Service: "電梯", status: false},
        {id: 6, Service: "車位", status: false},
    ]);
    const [PublicFacilityArray, setPublicFacilityArray] = useState([ //提供公共設施
        {id: 1, PublicFacility: "游泳池", status: false},
        {id: 2, PublicFacility: "視聽室", status: false},
    ]);
    const [IdentifyRequirement, setIdentifyRequirement] = useState([ //身分要求 租住條件
        {id: 1, Identify: "學生", status: false},
        {id: 2, Identify: "上班族", status: false},
        {id: 3, Identify: "家庭", status: false},
    ]);
    const [rentMoneyHaveArray, setRentMoneyHaveArray] = useState([ //租金包含內容
        {id: 1, rentMoneyItem: "管理費", status: false},
        {id: 2, rentMoneyItem: "清潔費", status: false},
        {id: 3, rentMoneyItem: "第四台", status: false},
        {id: 4, rentMoneyItem: "網路", status: false},
        {id: 5, rentMoneyItem: "水費", status: false},
        {id: 6, rentMoneyItem: "電費", status: false},
        {id: 7, rentMoneyItem: "瓦斯費", status: false},
    ]);

    const CountryArray = Object.keys(cityData);

    const handleRoomType = e => { //偵測是否為整層住家以確定是否顯示出租樓層
        setRoomType(e.target.value);
        if (e.target.value !== "整層住家") {
            setFloorStatus(true);
        } else {
            setFloorStatus(false);
        }
    }

    const handleSetRoom = (inputRoomNumber, roomName) => {
        const newRooms = rooms.map((room) => ({
            ...room,
            roomNumber: room.roomName === roomName ? inputRoomNumber : room.roomNumber
        }));
        setRooms(newRooms);
    }

    const handleChangeArray = (ItemID, setArrayFunction, setArrayName) => { //用以設置CheckBox陣列
        setArrayFunction(setArrayName.map((Item) => ({
            ...Item,
            status: Item.id === ItemID ? !Item.status : Item.status
        })))
    }

    const handleFile = e => { //顯示上傳照片
        setImages([...e.target.files]);
    }

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImgURL(newImageUrls);
    }, [images])


    // 設定日期預設值 取出現在的日期
    const today = new Date();
    const date = today.setDate(today.getDate());
    const defaultDateValue = new Date(date).toISOString().split("T")[0] // yyyy-mm-dd

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "auto"
        }}>
            <Typography variant="h4" color="initial">請選擇欲出租的房屋類型</Typography>
            <Stack sx={{border: 1, borderColor: "grey.200", width: "60%", p: 2}} spacing={2}>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 房屋類型 */}
                    <Typography variant="h6">房屋類型:</Typography>
                    <FormControl>
                        <InputLabel>房屋類型:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={houseType}
                            defaultValue={""}
                            sx={{width: 150}}
                            onChange={e => setHouseType(e.target.value)}
                        >
                            <MenuItem value={""} disabled>房屋類型:</MenuItem>
                            <MenuItem value={"公寓大樓"}>公寓大樓</MenuItem>
                            <MenuItem value={"透天厝"}>透天厝</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 房間類型 */}
                    <Typography variant="h6">房間類型:</Typography>
                    <FormControl>
                        <InputLabel>房間類型:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roomType}
                            defaultValue={""}
                            sx={{width: 150}}
                            onChange={handleRoomType}

                        >
                            <MenuItem value={""} disabled>房間類型:</MenuItem>
                            <MenuItem value={"整層住家"}>整層住家</MenuItem>
                            <MenuItem value={"獨立套房"}>獨立套房</MenuItem>
                            <MenuItem value={"分租套房"}>分租套房</MenuItem>
                            <MenuItem value={"雅房"}>雅房</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 地址 */}
                    <Typography variant="h6">出租地址:</Typography>
                    <FormControl>
                        <InputLabel>縣市</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addressCity}
                            defaultValue=""
                            sx={{width: 100}}
                            onChange={e => setAddressCity(e.target.value)}
                        >
                            <MenuItem value={""} disabled>縣市:</MenuItem>
                            {CountryArray.map((Country, index) => {
                                return <MenuItem key={index} value={Country}>{Country}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>鄉鎮市區</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addressArea}
                            defaultValue=""
                            sx={{width: 100}}
                            onChange={e => setAddressArea(e.target.value)}
                        >
                            <MenuItem value={""} disabled>鄉鎮市區</MenuItem>
                            {cityData[addressCity] && cityData[addressCity].map((area, index) => {
                                return <MenuItem key={index} value={area["AreaName"]}>{area["AreaName"]}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        id="Address"
                        label="地址名稱"
                        sx={{pl: 1}}
                        value={Address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </Stack>

                {floorStatus &&
                    <Stack direction="row" sx={{alignItems: "center"}}> {/* 樓層 */}
                        <Typography variant="h6">樓層:</Typography>
                        <TextField
                            id="Floor"
                            label="樓層"
                            sx={{pl: 1}}
                        />
                        樓之
                        <TextField
                            id="RoomID"
                            label="編號"
                            sx={{pl: 1, pr: 3}}
                        />
                        總樓層:
                        <TextField
                            id="AllFloornumber"
                            label="總樓層數量"
                            sx={{pl: 1}}
                        />
                    </Stack>}

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 房屋坪數 */}
                    <Typography variant="h6">房屋坪數:</Typography>
                    <TextField
                        id="squareFeet"
                        label="坪數"
                        sx={{pl: 1}}
                        value={squareFeet}
                        onChange={e => setSquareFeet(e.target.value)}
                    />坪
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 房數 */}
                    <Typography variant="h6">房間數量:</Typography>
                    <TextField
                        id="squareFeet"
                        label="房間數量"
                        sx={{pl: 1, width: 100}}
                        value={rooms[1].number}
                        onChange={e => handleSetRoom(e.target.value, "房間")}
                    />
                    <Typography variant="h6" sx={{pl: 1}}>衛浴數量:</Typography>
                    <TextField
                        id="squareFeet"
                        label="衛浴數量"
                        sx={{pl: 1, width: 100}}
                        value={rooms[2].number}
                        onChange={e => handleSetRoom(e.target.value, "衛浴")}
                    />
                    <Typography variant="h6" sx={{pl: 1}}>大廳數量:</Typography>
                    <TextField
                        id="squareFeet"
                        label="大廳數量"
                        sx={{pl: 1, width: 100}}
                        value={rooms[2].number}
                        onChange={e => handleSetRoom(e.target.value, "大廳")}
                    />
                    <Button variant="contained" color="primary" sx={{ml: 5}}>
                        新增更多房間
                    </Button>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 租金 */}
                    <Typography variant="h6">租金:</Typography>
                    <TextField
                        id="rentMoney"
                        value={rentMoney}
                        onChange={e => setRentMoney(e.target.value)}
                        sx={{backgroundColor: "white"}}
                    />
                    <Typography variant="inherit" color="initial" sx={{pl: 3}}>押金:</Typography>
                    <FormControl>
                        <InputLabel>押金</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={"面議"}
                            value={deposit}
                            sx={{width: 150}}
                            onChange={e => setDeposit(e.target.value)}
                        >
                            <MenuItem value={"面議"}>面議</MenuItem>
                            <MenuItem value={"一個月租金"}>一個月租金</MenuItem>
                            <MenuItem value={"兩個月租金"}>兩個月租金</MenuItem>

                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 房屋朝向 */}
                    <Typography variant="h6">房屋朝向:</Typography>
                    <FormControl>
                        <InputLabel>房屋朝向</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={"朝向"}
                            value={HouseForward}
                            sx={{width: 150}}
                            onChange={e => setHouseForward(e.target.value)}
                        >
                            <MenuItem value={"朝向"} disabled>朝向</MenuItem>
                            <MenuItem value={"坐北朝南"}>坐北朝南</MenuItem>
                            <MenuItem value={"坐南朝北"}>坐南朝北</MenuItem>
                            <MenuItem value={"坐西朝東"}>坐西朝東</MenuItem>
                            <MenuItem value={"坐東朝西"}>坐東朝西</MenuItem>

                        </Select>
                    </FormControl>
                </Stack>


                <Stack direction="row" sx={{alignItems: "center"}}> {/* 租金包含 */}
                    <Typography variant="h6">租金包含:</Typography>
                    {rentMoneyHaveArray.map((Item) => {
                        return (
                            <FormControlLabel
                                key={Item.id}
                                label={Item.rentMoneyItem}
                                control={
                                    <Checkbox
                                        value=""
                                        checked={Item.status}
                                        onChange={() => handleChangeArray(Item.id, setRentMoneyHaveArray, rentMoneyHaveArray)}
                                        color="primary"
                                    />
                                }
                            />
                        )
                    })}

                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 最短租期 */}
                    <Typography variant="h6">最短租期:</Typography>
                    <TextField
                        id="ShortestRentTime"
                        label="最短租期包含"
                        value={ShortestRentTime}
                        onChange={e => setShortestRentTime(e.target.value)}
                        sx={{width: "12%"}}
                    />
                    年
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 身分要求 */}
                    <Typography variant="h6">身分要求:</Typography>
                    {IdentifyRequirement.map((Item) => {
                        return (
                            <FormControlLabel
                                key={Item.id}
                                label={Item.Identify}
                                control={
                                    <Checkbox
                                        value=""
                                        checked={Item.status}
                                        onChange={() => handleChangeArray(Item.id, setIdentifyRequirement, IdentifyRequirement)}
                                        color="primary"
                                    />
                                }
                            />
                        )
                    })}
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 性別要求 */}
                    <Typography variant="h6">性別要求:</Typography>
                    <FormControl>
                        <RadioGroup row name="row-radio-buttons-group" value={SexRequirement}
                            onChange={e => setSexRequirement(e.target.value)}>
                            <FormControlLabel value="限女性" control={<Radio/>} label="限女性"/>
                            <FormControlLabel value="限男性" control={<Radio/>} label="限男性"/>
                            <FormControlLabel value="皆可" control={<Radio/>} label="皆可"/>
                        </RadioGroup>
                    </FormControl>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 可否開伙 */}
                    <Typography variant="h6">開伙:</Typography>
                    <FormControl>
                        <RadioGroup row name="row-radio-buttons-group" value={ableToFire}
                            onChange={e => setAbleToFire(e.target.value)}>
                            <FormControlLabel value={true} control={<Radio/>} label="可"/>
                            <FormControlLabel value={false} control={<Radio/>} label="不可"/>
                        </RadioGroup>
                    </FormControl>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 可否養寵物 */}
                    <Typography variant="h6">養寵物:</Typography>
                    <FormControl>
                        <RadioGroup row name="row-radio-buttons-group" value={AblePet}
                            onChange={e => setAblePet(e.target.value)}>
                            <FormControlLabel value={true} control={<Radio/>} label="可"/>
                            <FormControlLabel value={false} control={<Radio/>} label="不可"/>
                        </RadioGroup>
                    </FormControl>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 可遷入日 */}
                    <Typography variant="h6">可遷入日:</Typography>
                    <input type="date" id="ableToGetInDate" name="ableToGetInDate" style={{height: 30}}
                        value={ableToGetInDate} onChange={e => setAbleToGetInDate(e.target.value)}/>
                    <Button variant="contained" color="primary" sx={{ml: 3}}
                        onClick={() => setAbleToGetInDate(defaultDateValue)}>
                        可隨時遷入
                    </Button>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 提供私人設備 */}
                    <Typography variant="h6">提供私人設備:</Typography>
                    {furnitureArray.map((Item) => {
                        return (
                            <FormControlLabel
                                key={Item.id}
                                label={Item.furniture}
                                control={
                                    <Checkbox
                                        value=""
                                        checked={Item.status}
                                        onChange={() => handleChangeArray(Item.id, setFurnitureArray, furnitureArray)}
                                        color="primary"
                                    />
                                }
                            />
                        )
                    })}
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 提供服務 */}
                    <Typography variant="h6">提供服務:</Typography>
                    {ServiceArray.map((Item) => {
                        return (
                            <FormControlLabel
                                key={Item.id}
                                label={Item.Service}
                                control={
                                    <Checkbox
                                        value=""
                                        checked={Item.status}
                                        onChange={() => handleChangeArray(Item.id, setServiceArray, ServiceArray)}
                                        color="primary"
                                    />
                                }
                            />
                        )
                    })}
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 提供公共設施 */}
                    <Typography variant="h6">提供公共設施:</Typography>
                    {PublicFacilityArray.map((Item) => {
                        return (
                            <FormControlLabel
                                key={Item.id}
                                label={Item.PublicFacility}
                                control={
                                    <Checkbox
                                        value=""
                                        checked={Item.status}
                                        onChange={() => handleChangeArray(Item.id, setPublicFacilityArray, PublicFacilityArray)}
                                        color="primary"
                                    />
                                }
                            />
                        )
                    })}
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 房屋標題 */}
                    <Typography variant="h6" sx={{pr: 5}}>房屋標題:</Typography>
                    <TextField
                        required
                        id="House-title-required"
                        label="房屋標題"
                        value={Title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 房屋敘述 */}
                    <Typography variant="h6" sx={{pr: 5}}>房屋敘述:</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="房屋敘述"
                        multiline
                        rows={4}
                        value={Describe}
                        onChange={e => setDescribe(e.target.value)}
                        sx={{width: "70%"}}
                    />
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 上傳照片 */}
                    <Typography variant="h6">上傳照片:</Typography>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        上傳照片
                        <input
                            type="file"
                            hidden
                            onChange={handleFile}
                            multiple={true}
                        />
                    </Button>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center"}}> {/* 照片 */}
                    <Typography variant="h6">以上傳照片:</Typography>
                    <Stack direction="row" spacing={2} sx={{flexWrap: "wrap"}}>
                        {ImgURL && ImgURL.map((url, i) => {
                            return <img key={i} src={url} width="475" height="450" alt={i}/>
                        })}
                    </Stack>
                </Stack>

                <Stack direction="row" sx={{alignItems: "center", justifyContent: "flex-end"}}> {/* 照片 */}
                    <Button variant="contained" color="primary" size="large">
                        新增送出
                    </Button>
                    <Button variant="contained" sx={{backgroundColor: "#ab003c"}} size="large">
                        取消
                    </Button>
                </Stack>

            </Stack>
        </Box>
    );
}

export default AddRentPage;
