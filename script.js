const screens = document.querySelectorAll('.screen');
const chooseFoodBtn = document.querySelectorAll('.choose-food-btn')
const startBtn = document.getElementById('start-btn')
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')
let seconds = 0
let score = 0
let selectedFood = {}

startBtn.addEventListener('click', () => screens[0].classList.add('up'))

chooseFoodBtn.forEach(btn =>{
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selectedFood = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createFood, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime(){
    let m = Math.floor(seconds/ 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}
function createFood(){
    const food = document.createElement('div')
    food.classList.add('food')
    const { x, y } = getRandomLocation()
    food.style.left = `${x}px`
    food.style.top = `${y}px`
    food.innerHTML = `<img src="${selectedFood.src}" alt="${selectedFood.alt}" />`
    food.addEventListener('click', catchFood)
    gameContainer.appendChild(food)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchFood() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addFoods()
}

function addFoods() {
    setTimeout(createFood, 1000)
    setTimeout(createFood, 2500)
}

function increaseScore() {
    score++
    if(score > 29) {
        messageEl.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}