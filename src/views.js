import * as CanvasJS from 'canvasjs'
import moment from 'moment'
import { getMoistureLastDay } from './requests'

const vrijednosti = {
  "name":"moisture",
  "datapoints":"100",
  "data":[{"time":1560,"state":"10"},{"time":1565,"state":"20"}]
}

const nesto = [{"time":1560,"state":"10"},{"time":1565,"state":"20"}]

// Generates the DOM object that represents a single sensor and it's readings
// The DOM object is a bootstrap card
const generateSensorDOM = (sensor) => {
  const container = document.createElement('div')
  const cardEl = document.createElement('div')
  const cardBlockEl = document.createElement('div')
  const cardImgEl = document.createElement('img')
  const cardBodyEl = document.createElement('div')
  const cardTitleEl = document.createElement('h5')
  const cardListEl = document.createElement('ul')
  const cardListItem1 = document.createElement('li')
  const cardListItem2 = document.createElement('li')
  const cardListItem3 = document.createElement('li')
  const cardFooterEl = document.createElement('div')
  const buttonEl = document.createElement('button')

  // Setup top container
  container.classList.add('col-sm-3')

  // Setup card
  cardEl.classList.add('card')
  container.appendChild(cardEl)

  // Setup card block container
  cardBlockEl.classList.add('card-block')
  cardEl.appendChild(cardBlockEl)

  // Setup image
  cardImgEl.classList.add('card-img-top')
  // Placeholder image, supposed to either use image from openhab or a preset image based on the type
  if (sensor.name.includes('Orhideje')) {
    cardImgEl.src = '/images/orhideje.jpg'
  } else {
    cardImgEl.src = '/images/sobni-fikus.jpg'
  }
  cardImgEl.alt = 'Card image'
  cardBlockEl.appendChild(cardImgEl)

  // Setup card body
  cardBodyEl.classList.add('card-body')
  cardBlockEl.appendChild(cardBodyEl)

  // Setup card title
  cardTitleEl.classList.add('card-title')
  if (sensor.name === 'wsp' || sensor.name === 'moisture') {
    cardTitleEl.innerHTML = 'Kućna biljka'
  } else {
    cardTitleEl.innerHTML = `${sensor.name}`
  }
  cardBodyEl.appendChild(cardTitleEl)
  
  // Setup UL
  cardListEl.classList.add('list-group', 'list-group-flush')
  cardBodyEl.appendChild(cardListEl)

  // Setup ILs
  cardListItem1.classList.add('list-group-item')
  const soilWaterTension = hzToKpa(sensor.state)
  cardListItem1.textContent = `Vlaga tla: ${soilWaterTension.toFixed(2)} kPa`
  cardListItem2.classList.add('list-group-item')
  if (sensor.name.includes('Orhideje')) {
    cardListItem2.textContent = 'Tip: kućno cvijeće'
  } else {
    cardListItem2.textContent = 'Tip: sobna biljka'
  }
  cardListItem3.classList.add('list-group-item')
  if (soilWaterTension > 60) {
    cardListItem3.classList.add('text-danger')
    cardListItem3.textContent = 'Niska vlaga tla, potrebno zalijevati'
  } else {
    cardListItem3.textContent = 'Odgovarajuća vlaga'
  }
  cardListEl.appendChild(cardListItem1)
  cardListEl.appendChild(cardListItem2)
  cardListEl.appendChild(cardListItem3)

  // Setup card footer
  cardFooterEl.classList.add('card-footer')
  cardBlockEl.appendChild(cardFooterEl)

  // Setup close button
  buttonEl.classList.add('btn', 'btn-primary')
  buttonEl.type = 'button'
  buttonEl.innerHTML = 'Detalji'
  buttonEl.setAttribute('data-toggle', 'modal')
  buttonEl.setAttribute('data-target', '#exampleModalLong')
  buttonEl.addEventListener('click', () => {
    document.querySelector('#test-id').innerHTML = ''
    document.querySelector('#test-id').appendChild(generateModalDOM(sensor))
    getMoistureLastDay()
      .then(data => generateChart(data.data))
  })
  cardFooterEl.appendChild(buttonEl)

  return container
}

const generateModalDOM = (sensor) => {
  const container = document.createElement('div')
  const modalHeaderEl = document.createElement('div')
  const modalTitleEl = document.createElement('h5')
  const modalBodyEl = document.createElement('div')
  const textEl1 = document.createElement('p')
  const textEl2 = document.createElement('p')
  const textEl3 = document.createElement('p')
  const textEl4 = document.createElement('p')
  const modalFooterEl = document.createElement('div')
  const closeButton = document.createElement('button')
  const chartEl = document.createElement('div')
  const brEl = document.createElement('br')
  const tableEl = document.createElement('table')
  const tableBodyEl = document.createElement('tbody')
  const tableRowEl = document.createElement('tr')

  container.classList.add('modal-content')

  modalHeaderEl.classList.add('modal-header')
  container.appendChild(modalHeaderEl)

  modalTitleEl.classList.add('modal-title')
  if (sensor.name === 'wsp' || sensor.name === 'moisture') {
    modalTitleEl.innerHTML = 'Kućna biljka'
  } else {
    modalTitleEl.innerHTML = `${sensor.name}`
  }
  modalHeaderEl.appendChild(modalTitleEl)

  modalBodyEl.classList.add('modal-body')
  container.appendChild(modalBodyEl)

  let name
  if (sensor.name === 'wsp' || sensor.name === 'moisture') {
    name = 'Kućna biljka'
  } else {
    name = `${sensor.name}`
  }
  textEl1.textContent = `Puno ime: ${name}`
  modalBodyEl.appendChild(textEl1)

  let type
  if (sensor.name.includes('Orhideje')) {
    type = 'kućno cvijeće'
  } else {
    type = 'sobna biljka'
  }
  textEl2.textContent = `Tip biljke: ${type}`
  modalBodyEl.appendChild(textEl2)

  textEl3.textContent = `Trenutna vlaga tla: ${hzToKpa(sensor.state).toFixed(2)} kPa`
  modalBodyEl.appendChild(textEl3)

  textEl4.textContent = 'Nominalna vrijednost vlage: 60 kPa'
  modalBodyEl.appendChild(textEl4)

  chartEl.id = 'chartContainer';
  chartEl.setAttribute('style', 'height: 100px; width:200;')
  container.appendChild(brEl)   
  container.appendChild(chartEl)

  modalFooterEl.classList.add('modal-footer')
  container.appendChild(modalFooterEl)

  closeButton.classList.add('btn', 'btn-secondary')
  closeButton.type = 'button'
  closeButton.setAttribute('data-dismiss', 'modal')
  closeButton.textContent = 'Zatvori'
  modalFooterEl.appendChild(closeButton)

  return container
}

const generateChart = function (data) {
  // const dataTimePoints = values.data.map((data) => {
  //   return {label: data.time, y: data.state}
  // })
  data = data.slice(95)

  data = data.map((x, idx) => {
    return { label: moment(x.time), y: Math.floor(hzToKpa(x.state)), x: idx}
  })

  // console.log(testData)
  // console.log(data)
	var chart = new CanvasJS.Chart("chartContainer", {
    dataPointMaxWidth: 5,
		title:{
			text: "Graf test"              
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "line",
			dataPoints: data
      //   { label: "vlaga 1", y: 10 },
      //   { label: 'vlaga 2', y: 15 }
      // ]
		}
		]
	});
	chart.render();
}

const hzToKpa = (hz) => {
  return (150940 - 19.74 * hz) / (2.8875 * hz - 137.5)
}

export { generateSensorDOM }