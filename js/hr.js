const message1 = document.getElementById('message-1')
const tip1 = document.getElementById('tip-1')

const messages = [
  'Now Loading',
  'Now Loading.',
  'Now Loading..',
  'Now Loading...'
]

let i = 0

function showMessage_1() {
  if (i == 4) { i = 0 }
  message1.textContent = messages[i]
  i++
}

setInterval(showMessage_1, 500)