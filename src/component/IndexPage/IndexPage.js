import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SelectBar from "../SelectBar/SelectBar";
import BreadCrumbs from "../BreadCrumb/BreadCrumb";

import {
    Box,
    CardContent,
    Container,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Pagination,
    Popover,
    Typography
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

    const handleClickPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const popoverId = open ? "simple-popover" : undefined;

    const handlePageClick = (e) => {
        setPage(e.target.firstChild.textContent);
    }

    return (
        <>
            <Container>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: 500
                }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Home Less Helper
                        </Typography>
                        <Typography variant="h1">
                            我愛房東網
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            找到你夢寐以求的房子
                        </Typography>
                    </CardContent>
                </Box>
            </Container>
            <hr color="#eee" />
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
                    <IconButton
                        aria-describedby={popoverId}
                        variant="contained"
                        onClick={handleClickPopover}
                    >
                        <SearchIcon />
                    </IconButton>
                    <Popover
                        id={popoverId}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <SelectBar cityData={cityData}/>
                    </Popover>
                </Box>
                <Box sx={{px: 10, pb: 3}}>
                    <ImageList
                        cols={4}
                        rowHeight={250}
                        sx={{
                            width: "auto",
                            minHeight: 650,
                        }}
                    >
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
        </>
    );
}

export default IndexPage;
// https://images.unsplash.com/photo-1551963831-b3b1ca40c98e
