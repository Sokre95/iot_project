// Get an array of all available sensors
const getSensors = async () => {
  const response = await fetch('//20efdec0.ngrok.io/rest/items')
  if (response.status === 200) {
    return response.json()
  } else {
    throw new Error('Unable to get sensors')
  }
}

const getMoistureLastDay = async () => {
  const response = await fetch('//20efdec0.ngrok.io/rest/persistence/items/moisture')
  if (response.status === 200) {
    return response.json()
  } else {
    throw new Error('Unable to get measurements')
  }
}

export { getSensors, getMoistureLastDay }
