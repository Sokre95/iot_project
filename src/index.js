import { generateSensorDOM } from './views'
import { getSensors } from './requests'

const virtualSensors = [{
  name: 'Virtual sensor #1',
  state: 1001
}, {
  name: 'Virtual sensor #2',
  state: 1337
}]

getSensors()
  .then(sensors => {
    sensors.forEach(sensor => {
      document.querySelector('#sensors').appendChild(generateSensorDOM(sensor))
    });
  })

virtualSensors.forEach(sensor => document
  .querySelector('#sensors')
  .appendChild(generateSensorDOM(sensor)))

