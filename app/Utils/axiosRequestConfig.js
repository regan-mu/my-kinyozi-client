// Axios request configuration
import Cookies from "universal-cookie";

const axiosConfig = (method, url, data) => {
    const cookies = new Cookies();
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const token = cookies.get("token");
    return  {
        method: method,
        url: url,
        data: data,
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            "x-access-token": token
        }
    }
}

export default axiosConfig;