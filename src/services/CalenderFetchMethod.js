import axios from 'axios';
import config from '@/config';

//This method used to fetch the all meetting details based on Selected Date  it will take date and token as an argument to fetch the data
export const CalenderMethods = {
    fetchAndShowCalender: async (date, token) => {
        let calenderDetails;
        try {
            const response = await axios.get(`${config.BaseUrl}/calendar?date=${date}`, {
                headers: {
                    Authorization: token,
                },
            });

            //  Here this response we got as an response from the server which contains all the details all the meeting on the selected date
            //  Now we will convert the response.date in the our required format to plot it into the calender
            calenderDetails = response.data;
            const calenderArr = [];

            // here in this for loop for every meeting we calcuating the height and marginTop from startTime and endTime
            // To plot the values in the div in the calendar page
            for (let i = 0; i < calenderDetails.length; i++) {
                const members = calenderDetails[i].attendees;
                let marginTop = calenderDetails[i].startTime.hours * 65 + calenderDetails[i].startTime.minutes;
                let heightOf = 65 * (calenderDetails[i].endTime.hours - calenderDetails[i].startTime.hours) - 5;
                if (calenderDetails[i].endTime.minutes - calenderDetails[i].startTime.minutes != 0) {
                    heightOf += 5 + calenderDetails[i].endTime.minutes;
                }
                let memberEmail = [];
                for (let j = 0; j < members.length; j++) {
                    memberEmail[j] = members[j].email;
                }
                const meetingName = calenderDetails[i].name;
                const attendees = memberEmail;
                const startTime = marginTop;
                const endTime = heightOf;

                let attendeesList = attendees.join(', ');
                const meetingData = {
                    meetingName,
                    marginTop: startTime,
                    height: endTime,
                    attendeesList,
                };
                calenderArr.push(meetingData);
            }

            return calenderArr;
        } catch (error) {
            console.log(error);
            return '';
        }
    },
};
