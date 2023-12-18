// const getDateAndTime = (timestamp)=>{;
// const date = new Date(timestamp);

// const year = date.getFullYear();
// const month = date.getMonth() + 1; 
// const day = date.getDate();
// const hours = date.getHours();
// const minutes = date.getMinutes();
// const seconds = date.getSeconds();

// return ({Date: `${year}-${month}-${day}`,
// Time: `${hours}:${minutes}:${seconds}`})
// }
function getTimeAndDate(timestamp) {
    const dateObj = new Date(timestamp);
  
    const year = dateObj.getFullYear();
const month = dateObj.getMonth() + 1; // Adding 1 because January is represented as 0
const day = dateObj.getDate();
const hours = dateObj.getHours();
const minutes = dateObj.getMinutes();
const seconds = dateObj.getSeconds();

const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
const time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

return { date, time };
}

const timestamp = "2023-12-13T21:17:14.769Z";
const { date, time } = getTimeAndDate(timestamp);

console.log("Date:", date);
console.log("Time:", time);