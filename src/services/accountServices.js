import config from '@/config';
import axios from 'axios';

export const register =async (data) =>{
    const req = {
        method: 'post',
        url: `${config.BaseUrl}/auth/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        data
    };

    try {
        await axios(req);
        return true;
    } catch (error) {
        const err = error.request.response;
        let message = err.substring(12, 49);
        message = message.charAt(0).toUpperCase() + message.slice(1);
        return message;
    }
}

// export const login = (data) =>{
      

// }

export const logout = async () =>{
    console.log("logout pressed")
    

}

export const isAuthenticated = () =>{
    return !!localStorage.getItem('token');
}