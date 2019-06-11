// Get an array of all available sensors
const getSensors = async () => {
  const response = await fetch('//b2ea249e.ngrok.io/rest/items')
  if (response.status === 200) {
    return response.json()
  } else {
    throw new Error('Unable to get sensors')
  }
}

export { getSensors }