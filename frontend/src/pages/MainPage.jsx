import React, {useContext} from 'react';
import axios from "axios";
import {AuthContext} from "../context/index.js";

const MainPage = () => {
        const {setIsAuth} = useContext(AuthContext);

        async function logout() {
            await axios.get("http://localhost:8000/auth/logout", {withCredentials: true});
            setIsAuth(false);
        }

        return (
            <div
                className="mx-0 my-auto"
            >
                <h1>This is the main protected page of the app</h1>
                <button
                    className="bg-amber-100 px-10 py-5 mt-10"
                    onClick={logout}
                >Logout
                </button>
            </div>
        );
    }
;

export default MainPage;