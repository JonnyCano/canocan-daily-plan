// declare the variables:
// * currentDay container
// * div container that holds the dynamically created time blocks
// current time in moment
var moment = moment();

// create a funtion using jQuery to  create and append the current date to the header section on page load
$("p#currentDay").append(moment.format("dddd[,] MMMM Do"));
// * set classes to match the font in the header
// * loop to fill the hours of the day with a condition to allow access to hours in the current day only using mom=nt.js
// * format the date using moment.js syntax

// create a function that will implement 