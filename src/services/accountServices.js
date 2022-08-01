import config from '@/config';
import axios from 'axios';

// This method will take all registeration details as data  and register the user to the server
export const register = async (data) => {
    const req = {
        method: 'post',
        url: `${config.BaseUrl}/auth/register`,
        data,
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
};

// This method take login data as argument and login the user if valid other wise it will pass the error
export const loginUser = async (data) => {
    const req = {
        method: 'post',
        url: `${config.BaseUrl}/auth/login`,
        data,
    };
    try {
        const response = await axios(req);
        return response;
    } catch (error) {
        const msg = error.response.data;
        console.log(msg);
        return false;
    }
};

// This method will fetch all the emails of user present in the database and return all details as response
export const getAllEmail = async (token) => {
    const req = {
        method: 'get',
        url: `${config.BaseUrl}/users`,
        headers: {
            Authorization: token,
        },
    };
    try {
        const response = await axios(req);
        return response;
    } catch (error) {
        const msg = error.response.data;
        console.log(msg);
        return false;
    }
};

// This method will return all the teams details in which you present for the team validation during add meeting
export const getAllTeam = async (token) => {
    const req = {
        method: 'get',
        url: `${config.BaseUrl}/teams`,
        headers: {
            Authorization: token,
        },
    };
    try {
        const response = await axios(req);
        return response;
    } catch (error) {
        const msg = error.response.data;
        console.log(msg);
        return false;
    }
};
