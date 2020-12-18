function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [day, month, year].join('.');
}

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 7;
  // var msPerMonth = msPerDay * 30;
  // var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    var num = Math.round(elapsed / 1000);
    return `${num} ${declOfNum(num, ["секунду", "секунды", "секунд"])} назад`;

  } else if (elapsed < msPerHour) {
    num = Math.round(elapsed / msPerMinute);
    return `${num} ${declOfNum(num, ["минуту", "минуты", "минут"])} назад`;

  } else if (elapsed < msPerDay) {
    num = Math.round(elapsed / msPerHour);
    return `${num} ${declOfNum(num, ["час", "часа", "часов"])} назад`;

  } else if (elapsed < msPerMonth) {
    num = Math.round(elapsed / msPerDay);
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
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

export default { timeDifference };
