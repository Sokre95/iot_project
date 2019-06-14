import { generateSensorDOM } from './views'
import { getSensors, getMoistureLastDay } from './requests'

const virtualSensors = [{
  name: 'Fikus (virtualno)',
  state: 380
}, {
  name: 'Orhideje (virtualno)',
  state: 1362
}]

getSensors()
  .then(sensors => {
    // sensors.forEach(sensor => {
    //   document.querySelector('#sensors').appendChild(generateSensorDOM(sensor))
    document.querySelector('#sensors').appendChild(generateSensorDOM(sensors[0]))
    });
  

virtualSensors.forEach(sensor => document
  .querySelector('#sensors')
  .appendChild(generateSensorDOM(sensor)))

// getMoistureLastDay()
//   .then(values => {
//     console.log(values.data.map((data) => {
//       return {label: data.time, y: data.state}
//     }))
//   })

