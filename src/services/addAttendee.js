import axios from 'axios';

export const addAttendees = {
  addAttendeeToMeeting: async (meetingId, attendee, token) => {
    // console.log(meetingId);
    // console.log(attendee);
    // console.log(token);
    const req = {
      method: 'patch',
      url: `https://mymeetingsapp.herokuapp.com/api/meetings/${meetingId}?action=add_attendee&email=${attendee}`,
      headers: {
        Authorization: token,
      },
    };
    try {
      await axios(req);
      // console.log(response.data);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },
  addMemberToTeam: async (teamId, member, token) => {
    console.log(teamId);
    console.log(member);
    console.log(token);
    const req = {
      method: 'patch',
      url: `https://mymeetingsapp.herokuapp.com/api/teams/${teamId}?action=add_member&email=${member}`,
      headers: {
        Authorization: token,
      },
    };
    try {
      await axios(req);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
