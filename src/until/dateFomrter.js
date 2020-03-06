import moment from 'moment';

export default format = string => {
  const today = moment(new Date());
  const date = moment(new Date(string));
  let result = date.format('DD/MM/YYYY');
  if (today.diff(date, 'minutes') < 1) {
    result = `Vài giây trước`;
  } else if (today.diff(date, 'days') < 1) {
    if (today.diff(date, 'hours') < 12) {
      result = `${today.diff(date, 'hours') + 1} giờ trước`;
    } else {
      result = `Hôm qua, ${date.format('HH:mm')}`;
    }
  } else if (today.diff(date, 'days') < 4) {
    result = `${today.diff(date, 'days')} ngày trước`;
  }
  return result;
};