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

    loadDailyPlans(id).forEach(function(dailyPlan) {
        if (id === dailyPlan.hour) {
            dailyPlansArr.push(dailyPlan)
            textAreaEl.text(textAreaEl.val(dailyPlan.plans));
        }
    })

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
        textAreaEl.addClass("past").attr("id", id);
        // disable the save button element
        buttonEl.attr("disabled", true);
    }
    else if (moment().hour(id).isAfter(moment().local())) {
        textAreaEl.addClass("future").attr("id", id);
        // enable the textarea element
        textAreaEl.removeAttr("disabled");
    }
    else {
        textAreaEl.addClass("present").attr("id", id);
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
    dailyPlans = JSON.parse(localStorage.getItem("dailyPlans"));

    // if nothing stored in localStorage, create a new object to track all plans
    if (!dailyPlans) {
        // refresh the localstorage every day
        var dailyPlans = {
            hour: tracker,
            plans: ""
        };

        dailyPlansArr.push(dailyPlans);
        return dailyPlansArr;
    }

    console.log(dailyPlans);
    return dailyPlans;
};

// this funtion saves the user's daily plans to localstorage
var saveDailyPlans = function(id, userText) {
    dailyPlansArr.forEach(function(dailyPlan) {
        if (id === dailyPlan.hour) {
            dailyPlan.plans = userText;
        }
    })
    localStorage.setItem("dailyPlans", JSON.stringify(dailyPlansArr));
};

// this function creates time blocks after creating or loading localstorage item
var timeBlocks = function() {
    for (let i = 9; i < 18; i++) {
        createTimeBlocks(i);
    };
    //refresh every day
    if (moment().local().hour(0)) {
        localStorage.removeItem("dailyPlans");
    }
};

// call the function to display the current day
currentDateDisplay();
// call the function to create the time blocks
timeBlocks();