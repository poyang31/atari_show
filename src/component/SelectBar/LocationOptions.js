import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormGroup } from "@mui/material";

import { SetSearch } from "../../action";

const areas = {
    "北部": ["臺北市", "新北市", "桃園市", "新竹市", "基隆市", "新竹縣", "宜蘭縣"],
    "中部": ["臺中市", "彰化縣", "雲林縣", "苗栗縣", "南投縣"],
    "南部": ["高雄市", "臺南市", "嘉義市", "嘉義縣", "屏東縣"],
    "東部": ["臺東縣", "花蓮縣"],
    "離島": ["澎湖縣", "金門縣", "連江縣"]
}

function LocationOptions(props) {
    const SearchData = useSelector(state => state.Search);
    const dispatch = useDispatch();
    const { cityData } = props;
    const [position, setPosition] = useState("北部");
    const [county, setCounty] = useState(null);
    const [all, setAll] = useState(false);

    const handleChangePositions = (event) => {
        const newPosition = event.target.value;
        setPosition(newPosition);
        setCounty(null);
    };

    const handleChangeCounty = (event) => {
        const newCounty = event.target.value;
        dispatch(SetSearch("setCity", newCounty));
        setCounty(newCounty);
    };

    useEffect(() => {
        if (SearchData.address.city !== "") {
            const areaList = new Set(SearchData.address.township);
            setAll(cityData[county].length === areaList.size);
        }
        // if (SearchData.areaList[county] !== undefined) {
        //     const countyList = new Set(SearchData.areaList[county]);
        //     setAll(cityData[county].length === countyList.size);
        // }
    }, [county]);

    const rowProps = () => {
        return {
            sx: {
                mb: 1
            }
        }
    };

    const handleChangeArea = (event) => {
        const checked = event.target.checked;
        const name = event.target.name;
        const areaList = new Set(SearchData.address.township);
        // const countyList = new Set(SearchData.areaList[county]);
        if (name === "不限") {
            if (!checked) {
                cityData[county].map((area) =>  areaList.delete(area["AreaName"]) );
            } else {
                cityData[county].map((area) =>  areaList.add(area["AreaName"]) );
            }
            setAll(checked);

        } else {
            if (!checked) {
                areaList.delete(name);
            } else {
                areaList.add(name);
            }
            setAll(cityData[county].length === areaList.size);
        }
        dispatch(SetSearch("setTownship", Array.from(areaList)));
        // dispatch(SetSearch('setAreaList', {...SearchData.areaList, [county]: Array.from(areaList)}));
    };

    function isChecked(area) {
        return new Set(SearchData.address.township).has(area);
        // return new Set(SearchData.areaList[county]).has(area);
    }

    function hasChecked(county) {
        return (SearchData.address.city === county);
        // return (county in SearchData.areaList && SearchData.areaList[county].length > 0);
        // return (county in SearchData.areaList && SearchData.areaList[county].length > 0);
    }

    return (
        <>  {/* 戰南北 */}
            <FormControl {...rowProps()}>
                <FormLabel id="demo-controlled-radio-buttons-group">地區</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={position}
                    onChange={handleChangePositions}
                    row
                    sx={{ pl: 2 }}
                >
                    <FormControlLabel sx={{"& .MuiFormControlLabel-label": { fontSize: "0.8rem" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}} value="北部" control={<Radio />} label="北部" />
                    <FormControlLabel sx={{"& .MuiFormControlLabel-label": { fontSize: "0.8rem" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}} value="中部" control={<Radio />} label="中部" />
                    <FormControlLabel sx={{"& .MuiFormControlLabel-label": { fontSize: "0.8rem" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}} value="南部" control={<Radio />} label="南部" />
                    <FormControlLabel sx={{"& .MuiFormControlLabel-label": { fontSize: "0.8rem" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}} value="東部" control={<Radio />} label="東部" />
                    <FormControlLabel sx={{"& .MuiFormControlLabel-label": { fontSize: "0.8rem" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}} value="離島" control={<Radio />} label="離島" />
                </RadioGroup>
            </FormControl>
            {position && <> {/* 選擇縣市 */}
                <FormControl {...rowProps()}>
                    <FormLabel id="county-group">縣市</FormLabel>
                    <RadioGroup
                        name="county-group"
                        value={county}
                        onChange={handleChangeCounty}
                        row
                        sx={{ pl: 2 }}
                    >
                        {areas[position].map((county, i) =>
                            <FormControlLabel
                                key={i}
                                sx={{
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "0.8rem",
                                        color: hasChecked(county) && "blue"
                                    },
                                    "& .MuiSvgIcon-root": {
                                        fontSize: "0.8rem"
                                    }
                                }}
                                value={county}
                                control={<Radio/>}
                                label={county}
                            />
                        )}
                    </RadioGroup>
                </FormControl>
            </>}
            <FormControl {...rowProps()}>
                <FormLabel id="county-group">鄉鎮市區</FormLabel>
                {county && <> {/* 選擇鄉鎮市區 */}
                    <FormGroup
                        row
                        sx={{ pl: 2 }}
                    >
                        <FormControlLabel sx={{
                            "& .MuiFormControlLabel-label": {
                                fontSize: "0.8rem",
                                color: all && "blue"
                            },
                            "& .MuiSvgIcon-root": {
                                fontSize: "0.8rem"
                            }
                        }}
                        control={<Checkbox checked={all} onChange={handleChangeArea} name={"不限"} />} label={"不限　"}/>
                        {cityData[county].map((area, i) =>
                            <FormControlLabel
                                key={i}
                                sx={{
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "0.8rem",
                                        color: isChecked(area["AreaName"]) && "blue"
                                    },
                                    "& .MuiSvgIcon-root": {
                                        fontSize: "0.8rem"
                                    }
                                }}
                                control={<Checkbox county={county} checked={ isChecked(area["AreaName"]) } onChange={handleChangeArea} name={area["AreaName"]} />}
                                label={area["AreaName"]}
                            />
                        )}
                    </FormGroup>
                </>}
            </FormControl>
        </>
    )
}

export default LocationOptions;
