import React, {useContext, useState} from 'react';
import {getCode, sendCode} from '../api/Auth.js';
import {IMaskInput} from 'react-imask';
import {AuthContext} from "../context/index.js";

const Auth = () => {
    const {setIsAuth} = useContext(AuthContext);
    const [isPhoneNumberSend, setIsPhoneNumberSend] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");

    async function sendPhoneNumber(event) {
        event.preventDefault();
        if (phoneNumber === "") {
            setPhoneNumberError("Phone number cant be blank");
        } else {
            let phoneNumberToApi = phoneNumber.replaceAll(" ", "").replace(')', '').replace('(', '').replaceAll('-', '');
            setPhoneNumber(phoneNumberToApi);
            if (phoneNumberToApi.length !== 12) {
                setPhoneNumberError("Phone number need 11 symbols");
                return;
            }
            setIsPhoneNumberSend(true);
            try {
                await getCode(phoneNumberToApi);
            } catch (error) {
                switch (error.status) {
                    case 410:
                        setPhoneNumberError("Invalid phone number");
                        break;
                    case 403:
                        setPhoneNumberError("Invalid phone number");
                        break;
                }
            }
        }
    }

    async function handleCodeChange(value) {
        setCode(value);
        if (value.length === 7) {
            const codeToApi = value.replace(' ', '');
            try {
                await sendCode(codeToApi, phoneNumber);
                setIsAuth(true);
            } catch (error) {
                switch (error.status) {
                    case 410:
                        setCodeError("Wrong verification code");
                        break;
                    case 403:
                        setCodeError("Wrong verification code");
                        break;
                }
            }
        } else {
            setCodeError("");
        }
    }


    return (
        <div className="flex items-center flex-col h-10 overflow-hidden min-h-screen">
            <img
                src="https://images.genius.com/fb1941a3fba4348dcd9b81b8ca5b5292.1000x1000x1.jpg"
                alt="site-logo-img"
                style={{
                    width: "8rem",
                }}
            />
            <h3>Login to my Site!</h3>
            {!isPhoneNumberSend && (
                <form action="api/auth/login" className="mt-5 flex flex-col" onSubmit={sendPhoneNumber}>
                    <p className="flex flex-col">
                        <IMaskInput
                            mask="+7 (000) 000-00-00"
                            value={phoneNumber}
                            onAccept={(value) => setPhoneNumber(value)}
                            name="phone_number"
                            placeholder="Phone number:"
                            inputType="text"
                            className="rounded p-1 border-2 border-emerald-100 focus:outline-none"
                        />
                        {phoneNumberError && <span className="text-red-500 text-sm w-47">{phoneNumberError}</span>}
                    </p>
                    <button type="submit" className="mt-2 text-emerald-500">Get code</button>
                </form>
            )}
            {isPhoneNumberSend && (
                <>
                    <form action="api/auth/login" className="mt-5 flex flex-col" onSubmit={sendPhoneNumber}>
                        <p>
                            <IMaskInput
                                value={phoneNumber}
                                inputType="text"
                                className="rounded p-1 border-2 border-emerald-100 focus:outline-none bg-gray-100 text-gray-400"
                                disabled
                            />
                        </p>
                    </form>
                </>
            )}
            <div
                className={`flex flex-col gap-2  transition-all transform ${isPhoneNumberSend ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} duration-500`}>
                <IMaskInput
                    mask="000 000"
                    value={code}
                    onAccept={(value) => handleCodeChange(value)}
                    name="verification_code"
                    placeholder="Enter code:"
                    inputType="text"
                    className="rounded p-1 border-2 border-emerald-100 focus:outline-none text-center"
                />
                {codeError && <span className="text-red-500 text-sm w-47">{codeError}</span>}
            </div>
        </div>
    );
};

export default Auth;