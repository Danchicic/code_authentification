import './App.css'
import {useEffect, useState} from "react";
import {amILogged} from "./api/Auth.js";
import {AuthContext} from "./context/index.js";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./componenets/AppRouter.jsx";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        async function fetchApi() {
            try {
                const backendAuth = await amILogged();
                setIsAuth(backendAuth);
            } catch (e) {
                switch (e.code) {
                    case 401:
                        //try to refresh token
                        break;
                }
                console.log(e);
            }
        }
        fetchApi()
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
