import React from 'react';
import sendCode from '../api/Auth.js'
import {useState} from 'react';
import AuthFormField from "../componenets/AuthFormField.jsx";
import {IMaskInput} from 'react-imask';

const Auth = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isPhoneNumberSend, setIsPhoneNumberSend] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    async function sendPhoneNumber(event) {
        event.preventDefault();
        setIsPhoneNumberSend(true);
        // fetch api
    }

    async function verifyCode() {

        try {
            await sendCode(213312);
            setIsAuth(true)

        } catch (error) {
            switch (error.status) {
                case 422:
                    console.log("unprocessable entity");
                    break;
                case 410:
                    console.log("Wrong phone number");
                    break;
                case 403:
                    console.log("Wrong verification code");
                    break;
            }

        }
    }

    return (
        <div className="container flex items-center flex-col">
            <img
                src="https://images.genius.com/fb1941a3fba4348dcd9b81b8ca5b5292.1000x1000x1.jpg"
                alt="site-logo-img"
                style={{
                    width: "10%",
                    height: "10%",
                }}
            />
            <h3>Login to my Site!</h3>
            {!isPhoneNumberSend && <>
                <form action="api/auth/login" className="mt-5 flex flex-col" onSubmit={sendPhoneNumber}>
                    <p>
                        <IMaskInput
                            mask="+7 (000) 000-00-00"
                            value={phoneNumber}
                            onAccept={(value) => setPhoneNumber(value)}
                            name="phone_number"
                            placeholder="Phone number:"
                            inputType="text"
                            className="rounded p-1 border-2 border-emerald-100 focus:outline-none"
                        />
                    </p>
                    <button type="submit" className="mt-2 text-emerald-500">Get code</button>
                </form>
            </>}
            {isPhoneNumberSend &&
                <>
                    <form action="api/auth/login" className="mt-5 flex flex-col" onSubmit={sendPhoneNumber}>
                        <p>
                            <IMaskInput
                                mask="+7 (000) 000-00-00"
                                value={phoneNumber}
                                onAccept={(value) => setPhoneNumber(value)}
                                name="phone_number"
                                placeholder="Phone number:"
                                inputType="text"
                                className="rounded p-1 border-2 border-emerald-100 focus:outline-none bg-gray-100 text-gray-400"
                                disabled
                            />
                        </p>
                        {/*<button type="submit" className="mt-2 text-emerald-500">Get code</button>*/}
                    </form>
                    <AuthFormField name="code" labelText="Verification code:" inputType="text" className="my-5"/>
                    <button onClick={verifyCode}>Login</button>
                </>
            }
        </div>
    );
};

export default Auth;