import axios from 'axios';
import config from '@/config';

export const addMethods = {
  addMeeting: async (rawData, token) => {
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

  addTeam: async (data, token) => {
    const req = {
      method: 'post',
      url: `${config.BaseUrl}/teams`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data,
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
