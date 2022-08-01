/**
 * In This sevices We added two excuse methods
 * One excuseMeeting will be used to excuse yourself from the existing meeting
 * Two exuseTeam will be used to excuse yourself from the existing Team
 */

import axios from 'axios';
import config from '@/config';

export const excuseYourself = {
    //excuseMeeting() will take Meeting Id as id and token as an Argument and excuse the loged in user form the Meeting with given id
    // If user excuseed Successfully it will return true else false

    excuseMeeting: async (id, token) => {
        const req = {
            method: 'patch',
            url: `${config.BaseUrl}/meetings/${id}?action=remove_attendee`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
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

    // excuseTeam method will excuse the logged in user from the selected team
    // It will take team id and token as an argument
    // It wil return true if user excused successfully else it will return false

    excuseTeam: async (id, token) => {
        const req = {
            method: 'patch',
            url: `${config.BaseUrl}/teams/${id}?action=remove_member`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
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
