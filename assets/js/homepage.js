// persistent data object
var dailyPlansArr = [];

// create a funtion using jQuery to  create and append the current date to the header section on page load
var currentDateDisplay = function() {
    // declare the variables:
    var marqueeDateTimeEl = $("p#currentDay");
    var dateTime = moment().format("dddd[,] MMMM Do");

    // append to container and display to the user
    marqueeDateTimeEl.append(dateTime);
}

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

    // use jQuery to set the textarea on click
    buttonEl.on("click", function(event) {
        // disable the button on click event
        event.preventDefault();

        // declare the target textarea contents
        var userText = textAreaEl.val();

        // send the textarea contents to the save function and call it
        saveDailyPlans(id, userText);
    })

    // check for the current time against the desired time-blocks/id and enable textarea if in the present and future
    if (moment().hour(id).isBefore(moment().local())) {
        textAreaEl.addClass(`past ${id}`);
        // disable the save button element
        buttonEl.attr("disabled", true);
    }
    else if (moment().hour(id).isAfter(moment().local())) {
        textAreaEl.addClass(`future ${id}`);
        // enable the textarea element
        textAreaEl.removeAttr("disabled");
    }
    else {
        textAreaEl.addClass(`present ${id}`);
        textAreaEl.removeAttr("disabled")
    }

    // add the content to the DOM element
    hourEl.text(businessTime);

    // apppend the content elements to the form
    formEl.append(hourEl,textAreaEl,buttonEl);

    // append the form to the container
    timeBlockContainer.append(formEl);
};

var loadDailyPlans = function(tracker) {
    dailyPlansArr = JSON.parse(localStorage.getItem("dailyPlans"));

    // if nothing stored in localStorage, create a new object to track all plans
    if (!dailyPlansArr || moment().format("LT") === "12:00 AM") {
        // refresh the localstorage every day
        var emptyText = "";
        dailyPlansArr[tracker] = [emptyText];

        // save the new array
        saveDailyPlans(tracker, emptyText);
    }
    // otherwise send the text contents in local storage to the document window
    else {
        $(`textarea.${tracker}`).text(dailyPlansArr[tracker]);
    }
};

// this funtion saves the user's daily plans to localstorage
var saveDailyPlans = function(id, userText) {
    dailyPlansArr[id] = [userText];
    localStorage.setItem("dailyPlans", JSON.stringify(dailyPlansArr));
};

// this function creates time blocks
var timeBlocks = function() {
    for (let i = 9; i < 18; i++) {
        createTimeBlocks(i);
        loadDailyPlans(i)
    };
};

// call the function to display the current day
currentDateDisplay();
// call the function to create the time blocks
timeBlocks();