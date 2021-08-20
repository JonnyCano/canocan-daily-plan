// declare the variables:
// * currentDay container
// * div container that holds the dynamically created time blocks
// current time in moment
var rightNow = moment();
// current hour
var hourNow = rightNow.format("h")
// current hour in military time
var hourNowMilitary = rightNow.format("k");
// amPM distinction variable
var morningEvening = rightNow.format("A");

// create a funtion using jQuery to  create and append the current date to the header section on page load
$("p#currentDay").append(rightNow.format("dddd[,] MMMM Do"));
// * set classes to match the font in the header
// * loop to fill the hours of the day with a condition to allow access to hours in the current day only using mom=nt.js
// * format the date using moment.js syntax

// create a function that will make time blocks
var createTimeBlocks = function(id, hour, amPM) {
    // create the elements that make up time block
    var formEl = $("<form>").addClass("row");
    var hourEl = $("<h2>").addClass("col-2 overflow-auto hour time-block");
    var textAreaEl = $("<textarea>").addClass("col-9 description");

    // disable the textarea attribute
    textAreaEl.attr("disabled", "true");

    var buttonEl = $("<button>").addClass("col-1 saveBtn");
    var saveIconEl = $("<i>").addClass("fas fa-save");

    // append the icon to the buttonEl
    buttonEl.append(saveIconEl);

    // add the content to the DOM element
    hourEl.text((hour) + ":00" + amPM);

    // check for the current time and enable textarea if in the present and future
    if (hourNowMilitary < id || Number(hourNowMilitary) < 4) {
        formEl.addClass("past");
        console.log(id);
        console.log(hourNowMilitary);
    }
    if (hourNowMilitary == id || Number(hourNowMilitary) == 4) {
        formEl.addClass("present");
        // enable the textarea element
        textAreaEl.removeAttr("disabled");
        console.log(id);
        console.log(hourNowMilitary);
    }
    if (hourNowMilitary > id) {
        formEl.addClass("future");
        console.log(id);
        console.log(hourNowMilitary);
    }

    // apppend the content elements to the form
    formEl.append(hourEl,textAreaEl,buttonEl);

    // append the form to the container
    $("div.container").append(formEl);
};

for (let i = 9; i < 18; i++) {
    iString = i.toString();
    // if (iString == hourNowMilitary) {
    //     createTimeBlocks(iString, hourNow, morningEvening);
    // }
    // else {
    //     loadTasks();
    // }
    createTimeBlocks(iString, hourNow, morningEvening)
};

// create a function that will append time blocks to jQuery

// 