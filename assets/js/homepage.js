// persistent data object
var dailyPlansObj = {};
// current time in moment
var rightNow = moment();
// current hour
var hourNow = rightNow.format("h")
// current hour in military time
var hourNowMilitary = rightNow.format("k");

// create a funtion using jQuery to  create and append the current date to the header section on page load
var currentDateDisplay = function() {
    // declare the variables:
    var marqueeDateTimeEl = $("p#currentDay");
    var dateTime = moment().format("dddd[,] MMMM Do");

    // append and display to the user
    marqueeDateTimeEl.append(dateTime);
}

// * set classes to match the font in the header
// * loop to fill the hours of the day with a condition to allow access to hours in the current day only using mom=nt.js
// * format the date using moment.js syntax

// create a function that will make time blocks
var createTimeBlocks = function(id) {
    var businessTime = moment().hour(id).minutes(0).format("hA");

    // create single time block container
    var timeBlockContainer = $("div.container");

    // create the elements that make up time block
    var formEl = $("<form>").addClass("row hour");
    var hourEl = $("<h2>").addClass("col-2 time-block");
    var textAreaEl = $("<textarea>").addClass("col-9 description");

    // disable the textarea attribute
    textAreaEl.attr("disabled", "true");

    var buttonEl = $("<button>").addClass("col-1 saveBtn");
    var saveIconEl = $("<img>").attr("src", "./assets/images/lock-solid.svg").addClass("saveIcon");

    // append the icon to the buttonEl
    buttonEl.append(saveIconEl);

    // check for the current time against the desired time-blocks/id and enable textarea if in the present and future
    if (moment().hour(id).isBefore(moment().local())) {
        textAreaEl.addClass("past");
    }
    else if (moment.hour(id).isAfter(moment().local())) {
        textAreaEl.addClass("future");
        // enable the textarea element
        textAreaEl.removeAttr("disabled");
    }
    else {
        textAreaEl.addClass("present");
        textAreaEl.removeAttr("disabled")
    }

    // add the content to the DOM element
    hourEl.text(businessTime);

    // apppend the content elements to the form
    formEl.append(hourEl,textAreaEl,buttonEl);

    // append the form to the container
    timeBlockContainer.append(formEl);
};

var loadDailyPlans = function(tracker, userText) {
    dailyPlansObj = JSON.parse(localStorage.getItem("dailyPlansObj"));

    // if nothing stored in localStorage, create a new object to track all plans
    if (!dailyPlanskObj) {
        dailyPlansObj = {
            id: tracker,
            userPlan: userText
        }
    }

    // loop over object properties
};

var timeBlocks = function() {
    for (let i = 9; i < 18; i++) {
        createTimeBlocks(i)
    };
};

// call the function to display the current day
currentDateDisplay();
// call the function to create the time blocks
timeBlocks();