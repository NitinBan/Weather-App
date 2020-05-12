const path = require("path");
const express = require("express"); //it returns a function
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// -- starting app --

const app = express();

//define paths for express config
//[__dirname variable contain the dir name]
//path.join to manipulate the path
const publicDirPath = path.join(__dirname, "../public");
const veiwPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebars & the path where views and partials are located
app.set("view engine", "hbs");
app.set("views", veiwPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirPath));

// -- root page ---

//using view instead of html file to make the page dynamic
app.get("", (req, res) => {
  //instead of send , we can use render method to render our view.
  //it takes file/view name as arguement
  //and object which contain info that view can access.

  res.render("index", {
    title: "Weather App",
    name: "Nitin Bansal",
  });
});

// -- help page --

//using view instead of html file to make the page dynamic
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nitin Bansal",
  });
});

// -- about page --

//using view instead of html file to make the page dynamic
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nitin Bansal",
  });
});

// -- weather app page --

//it is an endpoint
app.get("/weather", (req, res) => {
  //to send something to user.
  //if there is no address provided , do this:-
  if (!req.query.address) {
    return res.send({
      error: "you must provide a address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecastData: data,
          location,
          address: req.query.address,
        });
      });
    }
  );

  //if the address is provided , do this:-
  // res.send({
  //   forecast: "good weather",
  //   location: "New Delhi",
  //   address: req.query.address,
  // });
});

// -- 404 error handler --

// '*' is used . bcs express will look for match but when there is no match,
//it will come to this section and show error.
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    name: "Nitin",
    errorMessage: "Help Article Not Found",
  });
});

//this error code section has to be in lst
//so that express can metch with above all routes and come here when nothing matches
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nitin",
    errorMessage: "Page Not Found",
  });
});

// -- start the server --

//it take port as arguement and optional function which runs when server is up and running
app.listen(3000, () => {
  console.log("server is up on port 3000.");
});

/* -- tutorials -- */

// Query String
//req object contain the query request sent to server via Query in the url
// app.get("/product", (req, res) => {
//   //req.query can access the queries key-value pair as an object.
//   //if condition is to make the query mandatory by printing a error msg
//   if (!req.query.search) {
//     return res.send({
//       error: "you must provide a search term",
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     product: [],
//   });
// });

/* alternatives */

/* -- root page -- */
//OR using use method to use a static page
//setup static dir to server || to setup a dir to express || to use a whole dir
//express.static takes path as arguement
//static method setup a static webpage

//app.use(express.static(path.join(__dirname, '../public')))

//OR using get method , a root handler
//get method is used when we want to do something when user access any route || to create a route
//like:- app.com || app.com/about || app.com/help
// it takes 2 arguement: -
//1.the route like help || about || nothing in case of app.com
//2.the fucntion describe what to send back to user when the route is accessed

//the function takes 2 arguemrnt:-
//1. object containing info of the request coming to the server
//2.response to send back

// app.get('', (req, res) => {
//to send something to user.  we can send html content or file
//res.send('<h1>Weather</h1>');
// })

/* -- help page -- */

//OR using use method to use a static page
// app.use(express.static(path.join(__dirname, '../public/help.html')))

//OR using get method , a help page handler

// app.get('/help', (req, res) => {
//to send something to user.  we can send json data i.e. an object or array or objects or json file
//     res.send({
//         name: 'Nitin',
//         age: 23
//     });
// })

/* -- about page -- */

//OR using use method to use a static page
// app.use(express.static(path.join(__dirname, '../public/help.html')))

//OR using get method , a about page handler

// app.get('/about', (req, res) => {
//to send something to user.
//     res.send('<h1>about</h1>');
// })
