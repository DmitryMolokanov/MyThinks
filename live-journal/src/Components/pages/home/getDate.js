function getDate() {
  const currentDate = new Date();
  const arrMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let date = `${currentDate.getDate()} ${
    arrMonth[currentDate.getMonth()]
  } ${currentDate.getFullYear()} at ${hours}:${minutes}`;
  return date;
}

export default getDate;
