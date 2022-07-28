/**
 * This file contains the services which we used to add attendee in the existing Meetings
 * and members to the  Existing Team.
 */
import axios from 'axios';

export const addAttendees = {
    /**
     * addAttendeeToMeeting() method will add attendee to the existing meeting
     * by taking meeting Id , attendee email and token as an argument
     */
    addAttendeeToMeeting: async (meetingId, attendee, token) => {
        const req = {
            method: 'patch',
            url: `https://mymeetingsapp.herokuapp.com/api/meetings/${meetingId}?action=add_attendee&email=${attendee}`,
            headers: {
                Authorization: token,
            },
        };
        try {
            await axios(req);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },

    /**
     * addMemberToTeam() method will add member to the existing Team
     * by taking Team Id , member email and token as an argument
     */
    addMemberToTeam: async (teamId, member, token) => {
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
