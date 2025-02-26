import axios from "axios";


export async function amILogged() {
    try {
        await axios.get('http://localhost:8000/auth/protected', {withCredentials: true});
        return true;
    } catch {
        return false;
    }

}

export async function sendCode(code, phoneNumber) {
    return await axios.get(
        "http://localhost:8000/auth/verify_code",
        {
            withCredentials: true,
            params: {
                code: code,
                phone_number: phoneNumber
            }
        });
}

export async function getCode(phoneNumber) {
    return await axios.post(
        "http://localhost:8000/auth/auth", new URLSearchParams({
            phone_number: phoneNumber
        }),
        {
            withCredentials: true,
            "headers": {
                'accept': 'application/json'
            }
        }
    )
}

