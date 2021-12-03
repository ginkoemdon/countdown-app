// Get all important elements from the page
const $form = document.getElementById('form')
const $dateTitle = document.getElementById('date-title')
const $finalDate = document.getElementById('start')
const $stop = document.getElementById('stop')
const $countdownContainer = document.getElementById('countdown-container')
const $countdown = document.getElementById('countdown')
const $countdownTitle = document.getElementById('countdown-title')

myStorage = window.localStorage;
// Put the object into storage

// Set up an global interval identifier
// We can use this to start and stop the interval countdown
let interval

// 60,000 milliseconds => 60s => 1 minute
// 86,400,000 milliseconds => 86,400 seconds => 1,440 minutes => 24 hours => 1 day
// 3,600,000 milliseconds => 3,600 seconds => 60 minutes => 1 hour

// converting milliseconds to hours
function toDay(ms) {
    const days = Math.floor(ms / 1000 / 60 / 60 / 24)

    if (days > 0) {
        return days
    }
    else {
        return 0
    }
}

// converting ms to hours
function toHours(ms) {
    const days = toDay(ms)
    const hours = Math.floor(ms / 1000 / 60 / 60)
    const remainingHours = hours - (days * 24)

    // FIXME: The issue here is that remainingHours is sometimes negative. 
    // We only want to return remainingHours if its positive. 
    // Otherwise we should return 0.
    return remainingHours
}

// converting ms to minutes
function toMinutes(ms) {
    const days = toDay(ms)
    const hours = toHours(ms)
    const minutes = Math.floor(ms / 1000 / 60)

    let remainingMinutes = minutes - (hours * 60) - (days * 24 * 60)

    return remainingMinutes
}

// converting ms to seconds
function toSeconds(ms) {
    const days = toDay(ms)
    const hours = toHours(ms)
    const minutes = toMinutes(ms)
    const seconds = Math.floor(ms / 1000)

    let remainingSeconds = seconds - (minutes * 60) - (hours * 60 * 60) - (days * 24 * 60 * 60)

    return remainingSeconds
}

// declaring a function that will run when the eventListener calls it. We know that this function gets called with an event object as an input. 
function onSubmit(event) {
    // submit usually causes page to refresh this is preventing such behavior
    event.preventDefault()
    //get the form input and name it finalDate

    //outputs the final dates value into the console
    const date = new Date($finalDate.value)
    console.log(date)

    // Update the count down every 1 second
    interval = setInterval(function () {
        const now = new Date()
        console.log(now)

        // Determine how many ms offset the dates are from GMT
        const timezoneOffset = now.getTimezoneOffset() * 60 * 1000

        // Find the distance between now and the count down date
        const distance = date.getTime() - now.getTime() + timezoneOffset
        console.log('distance => ', distance)

        const countdownRemaining = `${toDay(distance)} days, ${toHours(distance)} hours, ${toMinutes(distance)} minutes, ${toSeconds(distance)} seconds`

        $countdown.innerText = countdownRemaining
        console.log('countdownRemaining => ', countdownRemaining)
    }, 1000)

    $countdownTitle.textContent = $dateTitle.value

    // Make end button appear once I click submit button
    $form.hidden = true
    $stop.hidden = false
    $countdownContainer.hidden = false
}
// Making so that the stop button hides when clicked and the form appears
$stop.addEventListener('click', function () {
    clearInterval(interval)
    $stop.hidden = true
    $form.hidden = false
    $countdownContainer.hidden = true
})

// registering event listener for the Submit event, and it passing the function so that it can be called 
$form.addEventListener('submit', onSubmit)