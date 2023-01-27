import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useImmerReducer} from "use-immer";

//MUI IMPORTS
import {StyledEngineProvider} from "@mui/material";
import {CssBaseline} from "@mui/material";

//COMPONENTS IMPORTS
import Header from "./component/header/header";

//PAGES IMPORTS
import Principal from "./paginas/principal/principal";
import Listados from "./paginas/listados/listados";
import ListadoDetalle from "./component/listado-detalle/listado-detalle";
import Registrar from "./paginas/registrar/registrar";
import Acceder from "./paginas/acceder/acceder";
import AddPropiedad from "./paginas/agregar-propiedad/add-propiedad";
import Perfil from "./paginas/perfil/perfil";
import Agencias from "./paginas/agencias/agencias";
import AgenciaDetalle from "./component/agencia-detalle/agencia-detalle";

//CONTEXT IMPORT
import DispatchContext from "./contexts/dispatch-context";
import StateContext from "./contexts/state-context";

function App() {

    const initialState = {
        userUsername: localStorage.getItem('theUserUsername'),
        userEmail: localStorage.getItem('theUserEmail'),
        userId: localStorage.getItem('theUserId'),
        userToken: localStorage.getItem('theUserToken'),
        userIsLogged: !!localStorage.getItem('theUserUsername'),
    }
    function ReducerFuction(draft, action) {
        switch (action.type) {
            case 'catchToken':
                draft.userToken = action.tokenValue;
                break;
            case 'userSignIn':
                draft.userUsername = action.usernameInfo;
                draft.userEmail = action.emailInfo;
                draft.userId = action.idInfo;
                draft.userIsLogged = true;
                break;
            case 'logout':
                draft.userIsLogged = false
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

    useEffect(()=>{
        if (state.userIsLogged){
            localStorage.setItem('theUserUsername', state.userUsername);
            localStorage.setItem('theUserEmail', state.userEmail);
            localStorage.setItem('theUserId', state.userId);
            localStorage.setItem('theUserToken', state.userToken);
        }
        else {
            localStorage.removeItem('theUserUsername');
            localStorage.removeItem('theUserEmail');
            localStorage.removeItem('theUserId');
            localStorage.removeItem('theUserToken');
        }
    },
        [state.userIsLogged])

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <StyledEngineProvider injectFirst>
                    <BrowserRouter>
                        <CssBaseline/>
                        <Header/>
                        <Routes>
                            <Route path={'/'} element={<Principal/>}></Route>
                            <Route path={'/listados'} element={<Listados/>}></Route>
                            <Route path={'/listados/:id'} element={<ListadoDetalle/>}></Route>
                            <Route path={'/registrar'} element={<Registrar/>}></Route>
                            <Route path={'/acceder'} element={<Acceder/>}></Route>
                            <Route path={'/addpropiedad'} element={<AddPropiedad/>}></Route>
                            <Route path={'/perfil'} element={<Perfil/>}></Route>
                            <Route path={'/agencias'} element={<Agencias/>}></Route>
                            <Route path={'/agencias/:id'} element={<AgenciaDetalle/>}></Route>

                        </Routes>
                    </BrowserRouter>
                </StyledEngineProvider>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export default App;
