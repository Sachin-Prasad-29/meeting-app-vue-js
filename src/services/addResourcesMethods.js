/* 
    This file contains the services which we used to add a Meeting and add a Team .
*/
import axios from 'axios';
import config from '@/config';

export const addResourcesMethods = {
    /* 
        This addMeeting method takes rawData and token as parameter
        which contain all the required data needed to add a Meeting
        This rawData is already validated before sending you the error may not occur due to data format
    */
    addMeeting: async (rawData, token) => {
        // Creating the request object which will be passed in Axois
        const req = {
            method: 'post',
            url: `${config.BaseUrl}/meetings`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: rawData,
        };

        try {
            await axios(req);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },

    /* 
        This addTeam method takes rawData and token as parameter
        which contain all the required data needed to add a Team
        This rawData is already validated before sending you the error may not occur due to data format
    */
    addTeam: async (rawData, token) => {
        //Creating the req object which we will pass to the axios
        const req = {
            method: 'post',
            url: `${config.BaseUrl}/teams`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: rawData,
        };
        try {
            await axios(req);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },
};
