import * as React from "react";
import {useDispatch} from "react-redux";

import Box from "@mui/material/Box";

import {HashRouter, Route, Switch} from "react-router-dom"
import IndexPage from "./component/IndexPage/IndexPage";
import RentPage from "./component/RentPage/RentPage";
import PageDetail from "./component/PageDetail/PageDetail";
import NavBar from "./component/Navbar/Navbar";
import SignUp from "./component/SignUp/SignUp";
import SignIn from "./component/SignIn/SignIn";
import Footer from "./component/Footer/Footer";
import UserDetail from "./component/UserDetail/UserDetail";
import AddRentPage from "./component/AddRentPage/AddRentPage";
import NotFoundPage from "./component/NotFoundPage/NotFoundPage";
import client from "./client/http";
import cityCountyData from "./data/CityCountyData.json";
import {SetUser} from "./action";

const getProfile = () => client("/profile");

const cityData = Object.fromEntries(
    cityCountyData.map(
        (city) => [city.CityName, city.AreaList]
    )
);

function App() {
    const dispatch = useDispatch();

    // Store AuthToken
    const atariToken = localStorage.getItem("atari_token");
    if (atariToken) {
        getProfile()
            .then((res) => {
                // SetUser
                dispatch(SetUser(res));
            })
            .catch((e) => {
                console.error(e);
                localStorage.removeItem("atari_token");
            });
    }

    return (
        <HashRouter>
            <Box
                sx={{
                    width: "auto",
                    minHeight: "100vh",
                }}>
                <Box fullWidth
                    sx={{
                        minHeight: 50
                    }}>
                    {/* Navbar here */}
                    <NavBar/>
                </Box>
                <Box fullWidth
                    sx={{
                        minHeight: 800,
                        // backgroundColor: '#fcba03',
                    }}>
                    <Switch>
                        <Route exact path="/">
                            <IndexPage cityData={cityData}/>
                        </Route>
                        <Route exact path="/rent-page" component={RentPage}/>
                        <Route exact path="/add-rent-page">
                            <AddRentPage cityData={cityData}/>
                        </Route>
                        <Route exact path="/user-detail" component={UserDetail}/>
                        <Route exact path="/page-detail/:id" component={PageDetail}/>
                        <Route exact path="/sign-up" component={SignUp}/>
                        <Route exact path="/sign-in" component={SignIn}/>
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
                </Box>

                <Box fullWidth
                    sx={{
                        minHeight: 50
                    }}>
                    {/* Footer here */}
                    <Footer/>
                </Box>
            </Box>
        </HashRouter>
    );
}

export default App;
