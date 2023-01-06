import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

//MUI IMPORTS
import {StyledEngineProvider} from "@mui/material";
import {CssBaseline} from "@mui/material";

//COMPONENTS IMPORTS
import Header from "./component/header/header";
import Testing from "./component/testing";

//PAGES IMPORTS
import Principal from "./paginas/principal/principal";
import Listados from "./paginas/listados/listados";

function App() {
  return (
    <>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <CssBaseline/>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Principal/>}></Route>
                    <Route path={'/listados'} element={<Listados/>}></Route>
                    <Route path={'/testing'} element={<Testing/>}></Route>
                    <Route></Route>
                </Routes>
            </BrowserRouter>
        </StyledEngineProvider>
    </>
  );
}

export default App;
