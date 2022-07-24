import axios from 'axios';
import config from '@/config';

export const meetingMethods = {
  addMeeting: async (rawData,token) => {
    var req = {
        method: 'post',
        url: `${config.BaseUrl}/meetings`,
        headers: { 
          'Authorization': token, 
          'Content-Type': 'application/json'
        },
        data : rawData
      };
    
    try {
        await axios(req);
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
  }
}