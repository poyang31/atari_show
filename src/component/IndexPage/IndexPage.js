import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SelectBar from "../SelectBar/SelectBar";
import BreadCrumbs from "../BreadCrumb/BreadCrumb";

import {
    Box,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Pagination,
    Popover
} from "@mui/material";

function IndexPage(props) {
    const {cityData} = props;
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState("");

    // ToDo: use "page" value
    void (page);

    const Loop = () => {
        const tempDataList = [];
        for (let index = 0; index < 12; index++) {
            tempDataList.push(
                {
                    id: index,
                    src: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
                    alt: "超棒房屋",
                    date: "2022/03/25",
                },
            );
        }
        setDataList(tempDataList);
    };

    useEffect(() => {
        Loop();
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handlePageClick = (e) => {
        setPage(e.target.firstChild.textContent);
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: 800
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 10,
                pt: 3
            }}>
                <BreadCrumbs/>
                <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
                    <SearchIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <SelectBar cityData={cityData}/>
                </Popover>
            </Box>
            <Box sx={{px: 10, pb: 3}}>
                <ImageList cols={4} rowHeight={250}
                    sx={{
                        width: "auto",
                        minHeight: 650,
                    }}>
                    {dataList.map((data) => {
                        return (
                            <ImageListItem
                                key={data.id}
                                sx={{
                                    width: 350,
                                    p: 3,
                                    border: 1,
                                    borderColor: "#fff",
                                    borderRadius: 5,
                                    ":hover": {
                                        borderColor: "#eee",
                                    },
                                }}
                            >
                                <Link to={`/page-detail/${data.id}`}>
                                    <img
                                        alt={data.id}
                                        style={{width: 350, height: 200}}
                                        src={data.src}
                                        loading="lazy"
                                    />
                                </Link>
                                <ImageListItemBar
                                    title={"刊登日期:"}
                                    subtitle={<span>{data.date}</span>}
                                    position="below"
                                />
                            </ImageListItem>
                        )
                    })}
                </ImageList>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pb: 9
                }}>
                <Pagination
                    count={11}
                    defaultPage={1}
                    boundaryCount={2}
                    size="large"
                    onClick={handlePageClick}
                />
            </Box>
        </Box>
    );
}

export default IndexPage;
// https://images.unsplash.com/photo-1551963831-b3b1ca40c98e
