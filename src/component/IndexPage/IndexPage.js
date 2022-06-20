import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import SelectBar from "../SelectBar/SelectBar";
import BreadCrumbs from "../BreadCrumb/BreadCrumb";

import {
    Box,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Pagination
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

    const handlePageClick = (e) => {
        setPage(e.target.firstChild.textContent);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", minHeight: 800}}>
            <Box hidden>
                <SelectBar cityData={cityData}/>
            </Box>
            <Box sx={{px: 10, py: 3}}>
                <BreadCrumbs/>
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
