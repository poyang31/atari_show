import * as React from "react";
import {Link} from "react-router-dom";

import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    CardActions,
    Button
} from "@mui/material";

function NotFoundPage() {
    return (
        <Container>
            <Box sx={{ mb: 5 }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    或許蒸發了，就像愛情一樣
                </Typography>
                <hr color="#eee" />
            </Box>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h4" component="div">
                        Not Found
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        您指定的頁面不存在
                    </Typography>
                    <Typography variant="body2">
                        請檢查您的網址是否正確，或是稍後再次嘗試訪問。
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "right"}}>
                    <Button component={Link} to="/" size="large">回首頁</Button>
                </CardActions>
            </Card>
        </Container>
    )
}

export default NotFoundPage;
