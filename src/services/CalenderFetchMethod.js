import axios from 'axios';
import config from '@/config';
export const CalenderMethods = {
  fetchAndShowCalender: async (date, token) => {
    let calenderDetails;
    try {
      const response = await axios.get(`${config.BaseUrl}/calendar?date=${date}`, {
        headers: {
          Authorization: token,
        },
      });
      calenderDetails = response.data;
      //console.log(calenderDetails);
    } catch (error) {
      console.log(error);
    }
    //console.log(meetingDetails);
    //console.log(calenderDetails);
    const calenderArr =[];
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

      let attendeesList = attendees.join(", ");
      const meetingData = {
        meetingName,
        marginTop:startTime,
        height:endTime,
        attendeesList
      };
      calenderArr.push(meetingData);
      // const meetingStr = `

      //   <div class="meeing-guider">
      //     <div class="hours-block">
      //         <div class="block-time"></div>
      //           <div
      //           class="meeting-detail-div"
      //           style="width:96%; margin-top:${startTime}px; height:${endTime}px"> 
      //           <p class="m-0 p-0 font-bold">${meetingName}</p>
      //           <hr/>
      //           <span class="font-bold">Attendees: </span>${attendeesList}
      //     </div>
      //   </div>
      //   </div>

      //     `;
      //     meetingDetails += meetingStr;
    }
    
    return calenderArr;
  },
};
