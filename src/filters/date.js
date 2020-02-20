const { DateTime } = require('luxon');

module.exports = (dateObj, format = "LLL d, y") => {
  if (DateTime.isDateTime(dateObj)) {
    return dateObj.toFormat(format);
  } else {
    return DateTime.fromJSDate(dateObj, {
        zone: "utc"
      }).toFormat(format);
  };
}