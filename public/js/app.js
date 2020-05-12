const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  //preventDefault is preventing the defaults to happen
  //i.e. it is preventing the page to refresh when we submit the form
  //forms on submission refresh the page by default

  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //localhost:3000/weather?address=delhi

  fetch("/weather?address=" + location).then((response) => {
    //response contain the data
    //.json is used to parse the data
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
      }
    });
  });
});

/* -- tutorial -- */

//fetch api is used to get info from client
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   //response contain the data
//   //.json is used to parse the data
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
