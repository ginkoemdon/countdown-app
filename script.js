//creating a constant variable named forma
//declare form
const form = document.getElementById('form')

// give event argument because the event listener will call it with an event object
// functions only take arguments, not values. you can name inputs 

//declaring a function that will run when the eventLisitner calls it. We know that this function gets called with an event object as an input. 
function onSubmit(event){
    //get the form input and name it finalDate
    const finalDate = document.getElementById('start')
    //outputs the final dates value into the console
    console.log(finalDate.value)
    // submit usually causes page to refresh this is preventing such behaviour
    event.preventDefault()
}
// registering event listener for the Submit event, and it passing the function so that it can be called 
form.addEventListener('submit',  onSubmit)