// Generates the DOM object that represents a single sensor and it's readings
// The DOM object is a bootstrap card
const generateSensorDOM = (sensor) => {
  const container = document.createElement('div')
  const cardEl = document.createElement('div')
  const cardBlockEl = document.createElement('div')
  const cardImgEl = document.createElement('img')
  const cardBodyEl = document.createElement('div')
  const cardTitleEl = document.createElement('h5')
  const cardTextEl = document.createElement('p')
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
  cardImgEl.src = '/images/bean plant.jpg'
  cardImgEl.alt = 'Card image'
  cardBlockEl.appendChild(cardImgEl)

  // Setup card body
  cardBodyEl.classList.add('card-body')
  cardBlockEl.appendChild(cardBodyEl)

  // Setup card title
  cardTitleEl.classList.add('card-title')
  cardTitleEl.innerHTML = `Title: ${sensor.name}`
  cardBodyEl.appendChild(cardTitleEl)
  
  // Setup card text
  cardTextEl.classList.add('card-text')
  cardTextEl.innerHTML = `State: ${sensor.state}`
  cardBodyEl.appendChild(cardTextEl)

  // Setup card footer
  cardFooterEl.classList.add('card-footer')
  cardBlockEl.appendChild(cardFooterEl)

  // Setup close button
  buttonEl.classList.add('btn', 'btn-primary')
  buttonEl.type = 'button'
  buttonEl.innerHTML = 'Detalji'
  buttonEl.setAttribute('data-toggle', 'modal')
  buttonEl.setAttribute('data-target', '#exampleModalLong')
  cardFooterEl.appendChild(buttonEl)

  return container
}

export { generateSensorDOM }