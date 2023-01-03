import React from "react";
import Principal from "./paginas/principal/principal";
import {BrowserRouter, Route, Routes} from "react-router-dom";

//MUI IMPORTS
import {StyledEngineProvider} from "@mui/material";
import {CssBaseline} from "@mui/material";

//Components
import Header from "./component/header/header";

function App() {
  return (
    <>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <CssBaseline/>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Principal/>}></Route>
                    <Route path={'/acceder'} element={''}></Route>
                    <Route></Route>
                </Routes>
            </BrowserRouter>
        </StyledEngineProvider>
    </>
  );
}

export default App;
