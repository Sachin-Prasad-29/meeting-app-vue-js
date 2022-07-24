
export const getDateMethods ={
    getDate :(date) =>{
        const months = [
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
          const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const monthKey = parseInt(date.substring(5, 7));
          const dateKey = parseInt(date.substring(8, 10)); //date in number
          const yearKey = date.substring(0, 4); //year  in number
          const monthStr = months[monthKey - 1]; //month in words
          const days = new Date(`${months[monthKey - 1]} ${dateKey}, ${yearKey}`);
          const dayStr = daysArr[days.getDay()]; //day in words
          const cdate = dateKey;
          const month = monthStr;
          const day = dayStr;
          const year = yearKey;
          const dateData = {cdate,month,day,year};
          return dateData;
  },
}