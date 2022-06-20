import React, { useState } from "react";
import { useSelector } from "react-redux";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
    Button,
    Card,
    CardContent,
    CardActions
} from "@mui/material";

import LocationOptions from "./LocationOptions";
import ConditionOptions from "./ConditionOptions";

function SelectBar(props) {
    const { cityData } = props;
    const SearchData = useSelector(state => state.Search);
    const [expanded, setExpanded] = useState("panel1");

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onSubmit = () => {
        console.log("送出");
        console.log(SearchData)
    };

    return (
        <Card sx={{
            maxWidth: "600px"
        }}>
            <CardContent>
                <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            地區選擇
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <LocationOptions cityData={cityData} />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: "100%", flexShrink: 0 }}>條件選擇</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ConditionOptions cityData={cityData} />
                    </AccordionDetails>
                </Accordion>
            </CardContent>
            <CardActions sx={{justifyContent: "right"}}>
                <Button variant='outlined' onClick={onSubmit}>搜尋</Button>
            </CardActions>
        </Card>
    )
}

export default SelectBar;
