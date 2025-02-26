import axios from "axios";

async function sendCode(code) {
    return await axios.get(
        "http://localhost:8000/auth/verify_code",
        {
            params: {
                code: code,
                phone_number: "+71233219988"
            }
        });
}

export default sendCode;