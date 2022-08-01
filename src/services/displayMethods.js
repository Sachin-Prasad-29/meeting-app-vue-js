/**
 * In This sevices We added two methods which will be used to fetch and display the data of Meeting Details in Meeting Page
 * and Your Teams detials in Teams Page
 */

import axios from 'axios';
import config from '@/config';

export const displayMethods = {
    // displayMeetings method will take period (all,future,past,present ) ,search (any keyboard from meeting descriptin ) and token as arguments and fethc the All Meeting datails from the database
    displayMeetings: async (period, search, token) => {
        var req = {
            method: 'get',
            url: `${config.BaseUrl}/meetings?period=${period}&search=${search}`,
            headers: {
                Authorization: token,
            },
        };

        try {
            const response = await axios(req);
            const data = response.data;

            // After geeting the data from Server as response
            // We will format the date based on the requirement and store the required format data into the fetchedMeetingList Array
            const fetchedMeetingList = [];
            const month = [
                'January',
                'Febuary',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];

            for (let i = 0; i < data.length; i++) {
                const attendeesArr = [];
                for (let j = 0; j < data[i].attendees.length; j++) {
                    attendeesArr[j] = data[i].attendees[j].email;
                }

                let date = data[i].date.substring();
                date = date
                    .substring(8, 10)
                    .concat(
                        ' '.concat(month[parseInt(date.substring(5, 7)) - 1].concat(' '.concat(date.substring(0, 4))))
                    );
                const name = data[i].name;
                let startTimehour = data[i].startTime.hours;
                if (startTimehour < 10) startTimehour = '0'.concat(startTimehour);
                let startTimeMinues = data[i].startTime.minutes;
                if (startTimeMinues < 10) startTimeMinues = '0'.concat(startTimeMinues);

                let endTimehour = data[i].endTime.hours;
                if (endTimehour < 10) endTimehour = '0'.concat(endTimehour);
                let endTimeMinues = data[i].endTime.minutes;
                if (endTimeMinues < 10) endTimeMinues = '0'.concat(endTimeMinues);
                const id = data[i]._id;
                const fetchedMeeting = {
                    id,
                    date,
                    startTimehour,
                    startTimeMinues,
                    endTimehour,
                    endTimeMinues,
                    name,
                    attendeesArr,
                };
                fetchedMeetingList.push(fetchedMeeting);
            }
            return fetchedMeetingList;
        } catch (error) {
            // But if any error happens during the fetch Process we just Simplly return the empty array
            console.log(error.message);
            return '';
        }
    },
    // displayTeams method fetch all you team details and return it as as response else return false
    displayTeams: async (token) => {
        const req = {
            method: 'get',
            url: `${config.BaseUrl}/teams`,
            headers: {
                Authorization: token,
            },
        };
        try {
            const response = await axios(req);
            return response.data;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },
};
