const date = new Date()

function toLocal(h, m)
{
  let local

  local = new Date(date.getUTCFullYear(), date.getMonth(), date.getDate(), h, m - date.getTimezoneOffset())
  local = local.toISOString()

  return local.split('.')[0]
}

const airplanes = [{
  sideNumber: 'RA-12345',

  flightsTime: [
    {
      departure: toLocal(1, 15, 0),
      landing: toLocal(5, 35, 0)
    },
    {
      departure: toLocal(13, 0, 0),
      landing: toLocal(17, 25, 0)
    },
  ]
},{
  sideNumber: 'KX-75139',

  flightsTime: [
    {
      departure: toLocal(5, 5, 0),
      landing: toLocal(12, 45, 0)
    }
  ]
}]

export default airplanes
