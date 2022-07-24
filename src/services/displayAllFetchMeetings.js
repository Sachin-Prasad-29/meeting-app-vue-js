export const displayMethods = {
  displayMeetings: async (data) => {
    //console.log(data);
    let meetingDetailContainerStr = '';
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
      let attendeesList = attendeesArr.join(', ');

      let date = data[i].date.substring();
      date = date
        .substring(8, 10)
        .concat(' '.concat(month[parseInt(date.substring(5, 7)) - 1].concat(' '.concat(date.substring(0, 4)))));
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
      const eachMeetingDiv = `
            <div class="search-result my-2" data-id = "${id}">
                    <div class="mb-1">
                      <span class="meeting-date">${date}</span>
                      <span class="meeting-time">${startTimehour}:${startTimeMinues} - ${endTimehour}:${endTimeMinues}</span>
                    </div>
                    <div class="meeting-name">${name}</div>
                    <div class="mb-2"><button class="btn btn-danger excuse-yourself" id="excuse-yourself-${id}" >Excuse yourself</button></div>
                    <hr />
                    <div class="attendees mb-1">
                      <span class="font-bold">Attendees:</span>
                      ${attendeesList}
                    </div>
          
                    <div class="select-mem-div">
                    <form method="post" id="add-member-to-meeting-${id}" class="add-member-to-meeting">
                    <input type="hidden" name="id" value="${id}" id="id"/>
                      <input type="email" list="members" name="emails" id="emails" class="select-members" placeholder="Select members" />
                      <datalist id="members" class="meeting-card-datalist"></datalist>
                      <input type="submit" value="Add" class="btn-primary btn select-members" />
                      </form>
                    </div>
                  </div>
               `;
      meetingDetailContainerStr += eachMeetingDiv;
    }
    return meetingDetailContainerStr;
  },
};
