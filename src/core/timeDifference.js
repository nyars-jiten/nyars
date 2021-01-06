function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [day, month, year].join('.');
}

function timeDifference(current, previous) {
  const msPerNow = 1000;
  const msPerMinute = msPerNow * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 7;
  // const msPerMonth = msPerDay * 30;
  // const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerNow) {
    return `только что`;

  } else if (elapsed < msPerMinute) {
    const num = Math.round(elapsed / 1000);
    return `${num} ${declOfNum(num, ["секунду", "секунды", "секунд"])} назад`;

  } else if (elapsed < msPerHour) {
    const num = Math.round(elapsed / msPerMinute);
    return `${num} ${declOfNum(num, ["минуту", "минуты", "минут"])} назад`;

  } else if (elapsed < msPerDay) {
    const num = Math.round(elapsed / msPerHour);
    return `${num} ${declOfNum(num, ["час", "часа", "часов"])} назад`;

  } else if (elapsed < msPerMonth) {
    const num = Math.round(elapsed / msPerDay);
    return `${num} ${declOfNum(num, ["день", "дня", "дней"])} назад`;

  } else {
    const date = new Date(previous);
    return formatDate(date);

  }
  // } else if (elapsed < msPerYear) {
  //   num = Math.round(elapsed / msPerMonth);
  //   return  `${num} ${declOfNum(num, ["месяц", "месяца", "месяцев"])} назад`;

  // } else {
  //   num = Math.round(elapsed / msPerYear);
  //   return  `${num} ${declOfNum(num, ["год", "года", "лет"])} назад`;
  // }
}

// declOfNum(num, ['секунду', 'секунды', 'секунд'])
function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

export default { timeDifference };
