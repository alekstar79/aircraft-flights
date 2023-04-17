export const DATE_TIME_FORMAT = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }

/**
* Extracting and converting data into a readable form
* @param {Number} left
* @param {Number} top
* @param {Airplane} airplane
* @return {{top: Number, left: Number, flightsTime: FlightTime[]}}
*/
export function extractData({ left, top,  airplane })
{
  return  { left, top, ...airplane, flightsTime: [...airplane.flightsTime].map(time => ({ ...time })) }
}

/**
* Time Range Calculation
* @param {String} landing
* @param {String} departure
* @return {String}
*/
export function calcTimeRange(landing, departure)
{
  if (!landing || !departure) return ''

  const timestamp = (new Date(landing) - new Date(departure)) / 1000

  let hours, minutes //, seconds

  hours = Math.floor(timestamp / 60 / 60)
  minutes = Math.floor(timestamp / 60) - (hours * 60)
  // seconds = timestamp % 60

  return [hours, minutes /*, seconds*/ ]
    .map(v => v.toString().padStart(2, '0'))
    .join(':')
}

/**
* @param {String} dateTime
* @return {String}
*/
export function toLocaleTime(dateTime)
{
  return dateTime ? new Date(dateTime).toLocaleString('ru-RU', DATE_TIME_FORMAT) : ''
}
