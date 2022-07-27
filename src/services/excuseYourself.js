import axios from 'axios';

export const excuseYourself = {
  excuseMeeting: async (id, token) => {
    console.log(id);
    console.log(token);
    const req = {
      method: 'patch',
      url: `https://mymeetingsapp.herokuapp.com/api/meetings/${id}?action=remove_attendee`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios(req);
      console.log(response.data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  excuseTeam: async (id, token) => {
    // console.log(id);
    // console.log(token);

    const req = {
      method: 'patch',
      url: `https://mymeetingsapp.herokuapp.com/api/teams/${id}?action=remove_member`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = axios(req);
      console.log(response.data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
