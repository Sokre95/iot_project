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
  buttonEl.addEventListener('click', () => {
    document.querySelector('#test-id').innerHTML = ''
    document.querySelector('#test-id').appendChild(generateModalDOM(sensor))
  })
  cardFooterEl.appendChild(buttonEl)

  return container
}

/* <div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLongTitle">Taj i taj senzor</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    Razne informacije o senzoru + stupicasti grafovi
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
  </div>
</div> */

const generateModalDOM = (sensor) => {
  const container = document.createElement('div')
  const modalHeaderEl = document.createElement('div')
  const modalTitleEl = document.createElement('h5')
  const modalBodyEl = document.createElement('div')
  const modalFooterEl = document.createElement('div')
  const closeButton = document.createElement('button')

  container.classList.add('modal-content')

  modalHeaderEl.classList.add('modal-header')
  container.appendChild(modalHeaderEl)

  modalTitleEl.classList.add('modal-title')
  modalTitleEl.textContent = sensor.name
  modalHeaderEl.appendChild(modalTitleEl)

  modalBodyEl.classList.add('modal-body')
  modalBodyEl.textContent = 'Razne informacije o senzoru'
  modalBodyEl.textContent += sensor.state
  container.appendChild(modalBodyEl)

  modalFooterEl.classList.add('modal-footer')
  container.appendChild(modalFooterEl)

  closeButton.classList.add('btn', 'btn-secondary')
  closeButton.type = 'button'
  closeButton.setAttribute('data-dismiss', 'modal')
  closeButton.textContent = 'Zatvori'
  modalFooterEl.appendChild(closeButton)

  return container
}


export { generateSensorDOM }