"use strict";

let errors = document.querySelectorAll(".error");
let results = document.querySelectorAll(".result span");
let inputs = document.querySelectorAll("input");
let labels = document.querySelectorAll("label");
const loopLength = 3;

let day_input = document.getElementById("day");
let month_input = document.getElementById("month");
let year_input = document.getElementById("year");

let year_result = document.querySelector(".year-result span");
let month_result = document.querySelector(".month-result span");
let day_result = document.querySelector(".day-result span");

let submit = document.querySelector(".circle");

function calculateDates() {
  removeAllError(); 
  const enteredDate = moment([year_input.value, month_input.value - 1, day_input.value]); 
  
  dayValidation(day_input.value); 
  monthValidation(month_input.value);
  emptyFieldCheck(); 
  
  if (enteredDate.isValid()) {
    let dateArray = moment(enteredDate).preciseDiff(moment()).split(" ");

    let yearPassed = dateArray[0];
    let monthPassed = dateArray[2];
    let dayPassed = dateArray[4];

    year_result.innerHTML = yearPassed;
    month_result.innerHTML = monthPassed;
    day_result.innerHTML = dayPassed;
    yearValidation(year_input.value);
  } else {
    if (errors[1].innerHTML == "" && errors[2].innerHTML == "") {
      errors[0].innerHTML = "Must be a valid day";
      labels[0].style.color = "#ff5757";
      inputs[0].style.outlineColor = "#ff5757";
    }
    resetResults();
  }
}

submit.addEventListener("click", calculateDates);

inputs.forEach((input) => {
  input.addEventListener("focusout", function () {
    if (input.value.length == 1) {
      input.value = `0${input.value}`;
    }
  });
});
document.addEventListener("keydown", function myFunction(event) {
  if (event.key == "Enter") {
    calculateDates();
  }
});
function removeAllError() {
  for (let i = 0; i < loopLength; i++) {
    errors[i].innerHTML = "";
    labels[i].style.color = "#716f6f";
    inputs[i].style.outlineColor = "#716f6f";
  }
}
function dayValidation(input) {
  if (Number(input) >= 32 || Number(input) <= 0) {
    errors[0].innerHTML = "Must be a valid day";
    labels[0].style.color = "#ff5757";
    inputs[0].style.outlineColor = "#ff5757";
  }
}
function monthValidation(input) {
  if (Number(input) >= 13 || Number(input) <= 0) {
    errors[1].innerHTML = "Must be a valid month";
    labels[1].style.color = "#ff5757";
    inputs[1].style.outlineColor = "#ff5757";
  }
}
function emptyFieldCheck() {
  for (let i = 0; i < loopLength; i++) {
    if (inputs[i].value == "") {
      errors[i].innerHTML = "This field is required";
      labels[i].style.color = "#ff5757";
      inputs[i].style.outlineColor = "#ff5757";
    }
  }
}
function yearValidation(input) {
  if (Number(input) >= moment().year()) {
    errors[2].innerHTML = "Must be in the past";
    labels[2].style.color = "#ff5757";
    inputs[2].style.outlineColor = "#ff5757";
    resetResults();
  }
}

function resetResults() {
  for (let i = 0; i < loopLength; i++) {
    results[i].innerHTML = "--";
  }
}
