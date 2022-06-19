import * as React from "react";

import Box from "@mui/material/Box";

import {HashRouter, Route, Switch} from "react-router-dom"
import IndexPage from "./components/IndexPage/IndexPage";
import RentPage from "./components/RentPage/RentPage";
import PageDetail from "./components/PageDetail/PageDetail";
import NavBar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import AddRentPage from "./components/AddRentPage/AddRentPage";

import cityCountyData from "./data/CityCountyData.json";
import MemberDetail from "./components/MemberDetail/MemberDetail";

const cityData = Object.fromEntries(cityCountyData.map((city) => [city.CityName, city.AreaList]))

function App() {
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
                        <Route exact path="/RentPage" component={RentPage}/>
                        <Route exact path="/AddRentPage">
                            <AddRentPage cityData={cityData}/>
                        </Route>
                        <Route exact path="/MemberDetail" component={MemberDetail}/>
                        <Route exact path="/PageDetail/:id" component={PageDetail}/>
                        <Route exact path="/SignUp" component={SignUp}/>
                        <Route exact path="/SignIn" component={SignIn}/>
                        <Route path="*">Not Found. ERROR: 404</Route>
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
